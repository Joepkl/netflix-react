/** Vendor */
import { Navigate } from "react-router-dom";

/** Local */
import { LoginPage } from "@/pages/LoginPage.tsx";
import { BrowsePage } from "@/pages/BrowsePage.tsx";
import { ManageProfilesPage } from "@/pages/ManageProfilesPage.tsx";

/** Routes */
export const ROUTES = [
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/browse",
    element: <BrowsePage />,
  },
  {
    path: "/manage",
    element: <ManageProfilesPage />,
  },
];
