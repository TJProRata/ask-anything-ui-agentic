"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import { useWidgetAPI } from "@/hooks/use-widget-api";
import type { WidgetConfig, WidgetMessage } from "@/widgets/types";
import { Button } from "@/components/ui/button";
import { AskButton } from "@/components/ask-anything/ask-button";

interface FloatingWidgetProps extends WidgetConfig {
  config: WidgetConfig;
}

// TODO: Clean up FloatingWidget props
export function FloatingWidget({
  // containerId,
  config,
  apiKey,
  apiEndpoint,
  theme = "dark",
  buttonText = "Ask",
  headerTitle = "Ask New York Times Anything!",
  placeholder = "Ask Anything",
  position = "bottom-right",
  customStyles,
  initialExpanded = false,
  onReady,
  onMessage,
  onExpand,
  onCollapse,
}: FloatingWidgetProps) {
  const [isExpanded, setIsExpanded] = useState(initialExpanded);
  const [messages, setMessages] = useState<WidgetMessage[]>([]);
  const { sendMessage, isLoading, error } = useWidgetAPI(apiKey, apiEndpoint);

  const handleToggle = useCallback(() => {
    const newState = !isExpanded;
    setIsExpanded(newState);
    if (newState) {
      onExpand?.();
    } else {
      onCollapse?.();
    }
  }, [isExpanded, onExpand, onCollapse]);

  const handleSendMessage = useCallback(async (text: string) => {
    const userMessage: WidgetMessage = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    onMessage?.(userMessage);
    try {
      const response = await sendMessage(text, messages);
      const aiMessage: WidgetMessage = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      onMessage?.(aiMessage);
    } catch (err) {
      console.error('Failed to send message:', err);
    }
  }, [messages, sendMessage, onMessage]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isExpanded) {
        handleToggle();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isExpanded, handleToggle]);

  return (
    <div className="floating-widget flex items-center" data-theme={theme}>
      {!isExpanded && (
        <FloatingWidgetButton
          onClick={() => setIsExpanded(true)}
          text={buttonText}
        />
      )}
      {isExpanded && (
        <FloatingWidgetPanel
          isLoading={isLoading}
          messages={messages}
          headerTitle={headerTitle}
          placeholder={placeholder}
          error={error}
          onSendMessage={handleSendMessage}
          onCollapse={handleToggle}
        />
      )}
    </div>
  );
}

interface FloatingWidgetButtonProps {
  onClick: () => void;
  text: string;
}

function FloatingWidgetButton({ onClick, text }: FloatingWidgetButtonProps) {
  return (
    <AskButton
      className="floating-widget-button rounded-3xl border px-5 py-2"
      variant="outline"
      aria-label="Open Ask Anything Widget"
      onClick={onClick}
    >
      <span className="text-sm">{text}</span>
    </AskButton>
  );
}

interface FloatingWidgetPanelProps {
  isLoading: boolean;
  messages: WidgetMessage[];
  headerTitle: string;
  placeholder: string;
  error: string | null;
  onSendMessage: (text: string) => void;
  onCollapse: () => void;
}

function FloatingWidgetPanel({
  isLoading,
  messages,
  headerTitle,
  placeholder,
  error,
  onSendMessage,
  onCollapse,
}: FloatingWidgetPanelProps) {
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
    <div className="floating-widget-panel rounded-3xl border p-4">
      <span>FloatingWidgetPanel</span>
      {/* TODO: Implement actual FloatingWidgetPanel */}
    </div>
  );
}
