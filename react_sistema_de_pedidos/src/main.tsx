import ReactDOM from "react-dom/client";
import MainRoutes from "./routes";
import "./global.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { Toaster } from "./components/ui/toaster";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <MainRoutes />
    </BrowserRouter>
    <Toaster />
  </Provider>
  // </React.StrictMode>
);
