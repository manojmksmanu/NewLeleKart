import React, { createContext, useContext, useState, ReactNode } from "react";
import FullScreenLoading from "@/components/atoms/FullScreenLoading";

// Define the context type
type LoadingContextType = (loading: boolean) => void;

const LoadingContext = createContext<LoadingContextType>(() => {});

export const useLoading = () => useContext(LoadingContext);

interface LoadingProviderProps {
  children: ReactNode;
}

export const LoadingProvider: React.FC<LoadingProviderProps> = ({
  children,
}) => {
  const [fullScreenloading, setFullScreenLoading] = useState(false);

  return (
    <LoadingContext.Provider value={setFullScreenLoading}>
      {children}
      {fullScreenloading && <FullScreenLoading />}
    </LoadingContext.Provider>
  );
};
