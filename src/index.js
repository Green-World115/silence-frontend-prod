import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import "bootstrap/dist/css/bootstrap.min.css";
import ThemeProvider from "./theme";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}

      <App />
    </ThemeProvider>
  </React.StrictMode>
);
