// components/LiveSignal.tsx
"use client";
import React from "react";
import { usePredictionSocket } from "@/hooks/usePredictionSocket";

export default function LiveSignal() {
  const { data } = usePredictionSocket();

  if (!data) return <div>Waiting for prediction...</div>;

  return (
    <div className="border p-4 rounded shadow-md bg-white max-w-md">
      <h2 className="text-xl font-bold mb-2">
        {data.action === "BUY" ? "🟢 BUY Signal" : "🔴 SELL Signal"}
      </h2>
      <ul className="text-sm">
        <li>Price: ${data.price.toFixed(2)}</li>
        <li>Predicted Close: ${data.predicted_close.toFixed(2)}</li>
        <li>Confidence: {data.confidence.toFixed(2)}%</li>
        <li>Time: {data.timestamp}</li>
        <li>Bars Collected: {data.bars_formed}/30</li>
      </ul>
    </div>
  );
}
