"use client";

import { SendIcon } from "lucide-react";
import { Button } from "./button";
import { Textarea } from "./textarea";
import { useRef, useState } from "react";

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading?: boolean;
}

export function ChatInput({ onSend, isLoading }: ChatInputProps) {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;
    onSend(message);
    setMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full items-end gap-4 p-8 bg-white border-t">
      <Textarea
        ref={textareaRef}
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        rows={4}
        className="min-h-[100px] max-h-[300px] w-full resize-y rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-base"
        disabled={isLoading}
      />
      <Button
        type="submit"
        size="icon"
        disabled={!message.trim() || isLoading}
        className="h-14 w-14 rounded-2xl bg-blue-500 hover:bg-blue-600 transition-colors flex-shrink-0"
      >
        <SendIcon className="h-6 w-6" />
        <span className="sr-only">Send message</span>
      </Button>
    </form>
  );
} 