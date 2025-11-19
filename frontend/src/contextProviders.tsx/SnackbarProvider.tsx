import { Snackbar } from "@mui/material";
import { useState, type ReactNode } from "react";
import { SnackbarContext } from "./SnackbarContext";

export const SnackBarProvider = ({ children }: { children: ReactNode }) => {
  const [snack, setSnack] = useState({ open: false, message: "" });

  const showMessage = (message: string) => setSnack({ open: true, message });

  const handleClose = () => setSnack((prev) => ({ ...prev, open: false }));

  return (
    <SnackbarContext.Provider value={{ showMessage }}>
      {children}
      <Snackbar
        open={snack.open}
        autoHideDuration={5000}
        onClose={handleClose}
        message={snack.message}
      />
    </SnackbarContext.Provider>
  );
};
