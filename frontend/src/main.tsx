import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./Theme.tsx";
import { DataProvider } from "./contextProviders.tsx/DataProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider theme={theme}>
    <DataProvider>
      <StrictMode>
        <CssBaseline />
        <App />
      </StrictMode>
    </DataProvider>
  </ThemeProvider>
);
