// ToastContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";
import CustomToast from "@/components/molecules/CustomToast";

interface ToastContextProps {
  showToast: (message: string, type: string, duration: number) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const useToast = (): ToastContextProps => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

// Update ToastProvider to accept children as ReactNode
export const ToastProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<
    { message: string; type: string; duration: number }[]
  >([]);

  const showToast = (
    message: string,
    type: string = "info",
    duration: number = 3000
  ) => {
    setToasts((prevToasts) => [...prevToasts, { message, type, duration }]);
  };
  const handleCloseToast = () => {
    setToasts((prevToasts) => prevToasts.slice(1)); // Remove the first toast
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {toasts.map((toast, index) => (
        <CustomToast
          key={index}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={handleCloseToast}
        />
      ))}
      {children}
    </ToastContext.Provider>
  );
};
