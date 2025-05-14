"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
  useRef,
  useEffect,
} from "react";

interface SnackbarState {
  show: boolean;
  message: string;
  variant: "success" | "error" | "warning" | "info";
}

interface SnackbarContextType {
  showSnackbar: (
    message: string,
    variant?: "success" | "error" | "warning" | "info"
  ) => void;
  setSnackbar: React.Dispatch<React.SetStateAction<SnackbarState>>;
  snackbar: SnackbarState;
}

interface SnackbarProviderProps {
  children: ReactNode;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined
);

const SNACKBAR_TIMER = 5000;

export const SnackbarProvider: React.FC<SnackbarProviderProps> = ({
  children,
}) => {
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    show: false,
    message: "",
    variant: "success",
  });

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showSnackbar = useCallback(
    (
      message: string,
      variant: "success" | "error" | "warning" | "info" = "success"
    ) => {
      setSnackbar({ show: true, message, variant });

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        setSnackbar((prev) => ({ ...prev, show: false }));
        timerRef.current = null;
      }, SNACKBAR_TIMER);
    },
    []
  );

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <SnackbarContext.Provider value={{ showSnackbar, setSnackbar, snackbar }}>
      {children}
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = (): SnackbarContextType => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
};
