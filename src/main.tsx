/** Vendor */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

/** Router */
import { RouterProvider } from "react-router-dom";
import { router } from "@/router/router.tsx";

/** Local */
import "@/main.css";
import { store, persistor } from "@/store/store.ts";

/** Root */
createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </StrictMode>
);
