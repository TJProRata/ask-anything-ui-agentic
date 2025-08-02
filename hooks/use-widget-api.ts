import { useState, useCallback } from "react";
import type { WidgetAPIResponse, WidgetMessage } from "@/widgets/types";

export function useWidgetAPI(apiKey: string, endpoint?: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const defaultEndpoint = endpoint || "https://api.ask-anything.com/v1";

  const sendMessage = useCallback(async (
    text: string, 
    history: WidgetMessage[]
  ): Promise<string> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(defaultEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
          'X-Widget-Version': '1.0.0'
        },
        body: JSON.stringify({
          message: text,
          history: history.map(msg => ({
            role: msg.sender === 'user' ? 'user' : 'assistant',
            content: msg.text
          })),
          metadata: {
            timestamp: new Date().toISOString(),
            source: 'widget'
          }
        })
      });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const data: WidgetAPIResponse = await response.json();
      return data.message;
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to send message';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [apiKey, defaultEndpoint]);
  
  return { sendMessage, isLoading, error };
}