import ReactDOM from "react-dom/client";
import MainRoutes from "./routes";
import "./global.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <MainRoutes />
    </BrowserRouter>
  </Provider>
  // </React.StrictMode>
);
