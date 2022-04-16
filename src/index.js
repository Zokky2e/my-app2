import React from "react";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import {FavoritesContextProvider} from "./store/favorites-context";

const container = document.getElementById("root");
const app = createRoot(container);
app.render(
  <FavoritesContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </FavoritesContextProvider>
);
