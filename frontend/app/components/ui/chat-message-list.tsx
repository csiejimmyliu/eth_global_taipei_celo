"use client";

import { useAutoScroll } from "../hooks/use-auto-scroll";
import { ChatBubble } from "./chat-bubble";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatMessageListProps {
  messages: Message[];
  isLoading?: boolean;
}

export function ChatMessageList({ messages, isLoading }: ChatMessageListProps) {
  const ref = useAutoScroll<HTMLDivElement>([messages, isLoading]);

  return (
    <div ref={ref} className="flex-1 overflow-y-auto">
      {messages.map((message, index) => (
        <ChatBubble
          key={index}
          variant={message.role}
          message={message.content}
        />
      ))}
      {isLoading && (
        <ChatBubble
          variant="assistant"
          message=""
          isLoading={true}
        />
      )}
    </div>
  );
} 