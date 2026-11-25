import React from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { CartProvider } from "./context/cartcontext";

import App from "./App";
import "./styles.css";

import { initAnalytics } from "./analytics/analytics";

initAnalytics();

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </HelmetProvider>
  </React.StrictMode>
);