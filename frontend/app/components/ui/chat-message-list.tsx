"use client";

import { UserCircleIcon } from 'lucide-react';
import { Bot } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { useAutoScroll } from '../hooks/use-auto-scroll';
import { useEffect, useState } from 'react';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: number;
}

interface ChatMessageListProps {
  messages: Message[];
  isLoading?: boolean;
}

function MessageTimestamp({ timestamp }: { timestamp: number }) {
  const [formattedTime, setFormattedTime] = useState<string>('');

  useEffect(() => {
    setFormattedTime(new Date(timestamp).toLocaleTimeString());
  }, [timestamp]);

  return <div className="text-xs text-gray-500">{formattedTime}</div>;
}

export function ChatMessageList({ messages, isLoading }: ChatMessageListProps) {
  const ref = useAutoScroll<HTMLDivElement>([messages, isLoading]);

  return (
    <div ref={ref} className="flex flex-col space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={cn(
            'group relative flex w-full items-start gap-4 p-6',
            message.role === 'assistant' ? 'bg-gray-50' : 'bg-white'
          )}
        >
          <div className="flex-shrink-0">
            {message.role === 'user' ? (
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center ring-2 ring-white">
                <UserCircleIcon className="h-5 w-5 text-white" />
              </div>
            ) : (
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-violet-400 to-violet-600 flex items-center justify-center ring-2 ring-white">
                <Bot className="h-5 w-5 text-white" />
              </div>
            )}
          </div>

          <div className="flex min-h-[20px] flex-1 flex-col items-start gap-3">
            <div className="prose prose-sm max-w-none w-full break-words">
              {message.content}
            </div>
            <MessageTimestamp timestamp={message.timestamp} />
          </div>
        </div>
      ))}

      {isLoading && (
        <div className="flex w-full items-start gap-4 p-6 bg-gray-50">
          <div className="flex-shrink-0">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-violet-400 to-violet-600 flex items-center justify-center ring-2 ring-white">
              <div className="h-5 w-5 animate-pulse rounded-full bg-white/50" />
            </div>
          </div>
          <div className="flex min-h-[20px] flex-1 flex-col items-start gap-3">
            <div className="prose prose-sm">
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-violet-500 border-t-transparent" />
                Thinking...
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 