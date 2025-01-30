import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ThemeProvider } from "@mui/material";
import theme from "./themes.ts";

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Ensure Toastify styles are imported
import ErrorBoundary from "./utils/ErrorBoundary.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          {/* <ErrorBoundary> */}
            <ToastContainer />
            <App />
          {/* </ErrorBoundary> */}
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
