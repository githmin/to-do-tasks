import { createContext, useContext } from "react";

interface SnackbarContextType {
  showMessage: (message: string) => void;
  severity?: "error" | "warning" | "info" | "success";
}

export const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined
);

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
};
