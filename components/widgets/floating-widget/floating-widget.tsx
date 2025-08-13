"use client";

import React, { useState, useCallback, useEffect } from "react";
import { useWidgetAPI } from "@/hooks/use-widget-api";
import type { WidgetConfig, WidgetMessage } from "@/widgets/types";
import { FloatingWidgetButton } from "@/components/widgets/floating-widget/floating-widget-button";
import { FloatingWidgetCard } from "@/components/widgets/floating-widget/floating-widget-card";

interface FloatingWidgetProps { config: WidgetConfig; }

export function FloatingWidget({ config }: FloatingWidgetProps) {
  const {
    apiKey,
    apiEndpoint,
    theme = "dark",
    buttonText = "Ask",
    headerTitle = "Ask New York Times Anything!",
    placeholder = "Ask Anything",
    initialExpanded = false,
    onMessage,
    onExpand,
    onCollapse,
  } = config;
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
        <FloatingWidgetCard
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
