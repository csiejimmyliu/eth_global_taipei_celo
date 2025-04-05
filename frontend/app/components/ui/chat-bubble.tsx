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
        "flex w-full gap-2 px-4 py-8",
        variant === "assistant" ? "bg-secondary/25" : "bg-background"
      )}
    >
      <Avatar className="h-8 w-8">
        <span className="text-xs">
          {variant === "assistant" ? "AI" : "You"}
        </span>
      </Avatar>
      <div className="flex-1">
        {isLoading ? (
          <MessageLoading />
        ) : (
          <p className="text-sm text-foreground">{message}</p>
        )}
      </div>
    </div>
  );
} 