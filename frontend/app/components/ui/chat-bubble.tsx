"use client";

import { cn } from "@/lib/utils";
import { Avatar } from "./avatar";
import { MessageLoading } from "./message-loading";

interface ChatBubbleProps {
  variant: "user" | "assistant";
  message: string;
  isLoading?: boolean;
}

export function ChatBubble({ variant, message, isLoading }: ChatBubbleProps) {
  return (
    <div
      className={cn(
        "flex w-full gap-4 px-6 py-4",
        variant === "user" ? "flex-row-reverse" : "flex-row"
      )}
    >
      <Avatar className="h-8 w-8 flex-shrink-0">
        <span className="text-xs">
          {variant === "assistant" ? "AI" : "You"}
        </span>
      </Avatar>
      <div 
        className={cn(
          "flex max-w-[80%] flex-col gap-1",
          variant === "user" ? "items-end" : "items-start"
        )}
      >
        {isLoading ? (
          <MessageLoading />
        ) : (
          <div className={cn(
            "rounded-2xl px-4 py-2 text-sm",
            variant === "assistant" 
              ? "bg-yellow-100 text-gray-900" 
              : "bg-blue-500 text-white"
          )}>
            {message}
          </div>
        )}
        <span className="text-xs text-gray-500">
          {new Date().toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
} 