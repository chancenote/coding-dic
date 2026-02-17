"use client";

import { useEffect, useState } from "react";
import { CheckCircle, AlertCircle, Copy } from "lucide-react";

type ToastType = "success" | "error" | "copy";

interface ToastMessage {
  id: number;
  text: string;
  type: ToastType;
}

let toastId = 0;
const listeners: Set<(msg: ToastMessage) => void> = new Set();

export function showToast(text: string, type: ToastType = "success") {
  const msg: ToastMessage = { id: ++toastId, text, type };
  listeners.forEach((fn) => fn(msg));
}

const icons: Record<ToastType, typeof CheckCircle> = {
  success: CheckCircle,
  error: AlertCircle,
  copy: Copy,
};

const bgColors: Record<ToastType, string> = {
  success: "bg-emerald-600",
  error: "bg-red-500",
  copy: "bg-accent",
};

export default function ToastContainer() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    const handler = (msg: ToastMessage) => {
      setToasts((prev) => [...prev, msg]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== msg.id));
      }, 3000);
    };
    listeners.add(handler);
    return () => { listeners.delete(handler); };
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2" role="status" aria-live="polite">
      {toasts.map((t) => {
        const Icon = icons[t.type];
        return (
          <div
            key={t.id}
            className={`animate-slide-up flex items-center gap-2 px-5 py-3 rounded-2xl shadow-elevated text-white text-caption font-medium ${bgColors[t.type]}`}
          >
            <Icon size={16} />
            <span>{t.text}</span>
          </div>
        );
      })}
    </div>
  );
}
