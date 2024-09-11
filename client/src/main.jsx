import ReactDOM from "react-dom/client";
import App from "../src/App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import Loader from "../src/componnents/Spinner.jsx";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import { Suspense } from "react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Suspense fallback={<Loader />}>
      <Provider store={store}>
        <App />
      </Provider>
    </Suspense>
    <Toaster position="top-center" reverseOrder={false} />
  </BrowserRouter>
);
