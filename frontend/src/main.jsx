import { QueryClient, QueryClientProvider } from "react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import "./global.css";
import { BrowserRouter } from "react-router-dom";
import MainRoutes from "./routes.jsx";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-indigo/theme.css"; // theme
import { PedidoContextProvider } from "./contexts/PedidoContext.jsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <PrimeReactProvider>
        <PedidoContextProvider>
          <BrowserRouter>
            <MainRoutes />
          </BrowserRouter>
        </PedidoContextProvider>
      </PrimeReactProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
