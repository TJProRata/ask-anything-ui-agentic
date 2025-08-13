"use client";

import React, { useState, useEffect, useRef } from "react";
import type { WidgetMessage } from "@/widgets/types";

interface FloatingWidgetCardProps {
  isLoading: boolean;
  messages: WidgetMessage[];
  headerTitle: string;
  placeholder: string;
  error: string | null;
  onSendMessage: (text: string) => void;
  onCollapse: () => void;
}

export function FloatingWidgetCard({
  isLoading,
  messages,
  headerTitle,
  placeholder,
  error,
  onSendMessage,
  onCollapse,
}: FloatingWidgetCardProps) {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  return (
    <div className="floating-widget-panel rounded-3xl p-3" aria-labelledby="floating-widget-title">
      <div className="flex items-center justify-between">
        <span id="floating-widget-title" className="text-sm font-medium">{headerTitle}</span>
        <button
          className="text-xs opacity-70 hover:opacity-100"
          onClick={onCollapse}
          aria-label="Close"
          title="Close"
        >
          ✕
        </button>
      </div>
      <div
        className="flex-1 overflow-y-auto rounded-md border border-[color:var(--widget-border)] p-2 space-y-2"
        role="log"
        aria-live="polite"
        aria-relevant="additions text"
        aria-atomic="false"
      >
        {messages.map((m) => (
          <div key={m.id} className="text-xs">
            <span className="opacity-70">{m.sender === 'user' ? 'You' : 'AI'}:</span> {m.text}
          </div>
        ))}
        {isLoading && (
          <div className="text-xs opacity-70" role="status" aria-live="polite">AI is typing…</div>
        )}
        {error && (
          <div className="text-xs text-red-400" role="alert">{error}</div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <input
          ref={inputRef}
          className="flex-1 rounded-md border border-[color:var(--widget-border)] bg-transparent px-2 py-1 text-sm"
          placeholder={placeholder}
          aria-label={placeholder || "Type your message"}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="rounded-md bg-[color:var(--widget-primary)] px-3 py-1 text-xs text-black disabled:opacity-50"
          aria-label="Send message"
          disabled={isLoading || !input.trim()}
        >
          Send
        </button>
      </form>
    </div>
  );
}