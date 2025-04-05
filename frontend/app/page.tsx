'use client';

import { useState } from 'react';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hello! I am your Celo Agent. I can help you deploy smart contracts, interact with tokens, and manage your blockchain assets. How can I assist you today?'
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (content: string) => {
    // Add user message
    const newMessages = [...messages, { role: 'user', content }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      // Send message to your backend API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: newMessages,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      
      // Add assistant response
      setMessages([...newMessages, {
        role: 'assistant',
        content: data.response,
      }]);
    } catch (error) {
      console.error('Error:', error);
      // Add error message
      setMessages([...newMessages, {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex flex-col h-screen bg-white">
      <div className="flex-1 overflow-y-auto">
        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            role={message.role}
            content={message.content}
          />
        ))}
        {isLoading && (
          <ChatMessage
            role="assistant"
            content="Thinking..."
          />
        )}
      </div>
      <ChatInput
        onSend={handleSendMessage}
        disabled={isLoading}
      />
    </main>
  );
}
