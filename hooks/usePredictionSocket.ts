// hooks/usePredictionSocket.ts
import { useEffect, useRef, useState } from "react";

export interface PredictionData {
  timestamp: string;
  price: number;
  predicted_close: number;
  confidence: number;
  action: "BUY" | "SELL";
  bars_formed: number;
}

export const usePredictionSocket = (
  url = "ws://localhost:8000/ws/predictions"
) => {
  const [data, setData] = useState<PredictionData | null>(null);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket(url);
    socketRef.current = socket;

    socket.onmessage = (event) => {
      const message: PredictionData = JSON.parse(event.data);
      setData(message);
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => {
      socket.close();
    };
  }, [url]);

  return { data };
};
