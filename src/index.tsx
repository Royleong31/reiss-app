import React from "react";
import { Provider as ReduxProvider } from "react-redux";
import { createRoot } from "react-dom/client";
import App from "./App";
import store from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";

const container = document.getElementById("root")!;
const root = createRoot(container);

const persistor = persistStore(store);
const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </QueryClientProvider>
      </PersistGate>
    </ReduxProvider>
  </React.StrictMode>
);
