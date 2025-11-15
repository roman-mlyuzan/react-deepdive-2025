import { useEffect, useState } from "react";
import type { Toast } from "../../types/toast";

interface ToastProps {
  toast: Toast;
  onClose: () => void;
}

export default function Toast({ toast, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 10);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    // Wait for animation to complete before removing
    setTimeout(onClose, 300);
  };

  const getIcon = () => {
    switch (toast.type) {
      case "success":
        return "✓";
      case "error":
        return "✕";
      case "warning":
        return "⚠";
      case "info":
        return "ℹ";
      default:
        return "";
    }
  };

  const getToastStyles = () => {
    switch (toast.type) {
      case "success":
        return "bg-green-600 text-white";
      case "error":
        return "bg-red-600 text-white";
      case "warning":
        return "bg-yellow-500 text-white";
      case "info":
        return "bg-blue-600 text-white";
      default:
        return "bg-gray-800 text-white";
    }
  };

  return (
    <div
      className={`${getToastStyles()} px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 min-w-[300px] max-w-md transition-all duration-300 transform ${
        isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      }`}
    >
      <span className="text-xl font-bold">{getIcon()}</span>
      <p className="flex-1 font-medium">{toast.message}</p>
      <button
        onClick={handleClose}
        className="text-white hover:text-gray-200 font-bold text-xl leading-none"
        aria-label="Close"
      >
        ×
      </button>
    </div>
  );
}
