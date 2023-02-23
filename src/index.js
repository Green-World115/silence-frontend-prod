import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import "bootstrap/dist/css/bootstrap.min.css";
import ThemeProvider from "./themes";
import { SnackbarProvider } from "notistack";
import AuthProvider from "feature/auth/context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <SnackbarProvider
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </SnackbarProvider>{" "}
    </AuthProvider>
  </React.StrictMode>
);
