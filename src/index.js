import React from "react";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";

const container = document.getElementById("root");
const app = createRoot(container);
app.render(
  
  
    <BrowserRouter>
      <App />
    </BrowserRouter>
);
