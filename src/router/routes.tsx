/** Vendor */
import { Navigate } from "react-router-dom";

/** Local */
import { LoginPage } from "@/pages/LoginPage.tsx";
import { BrowsePage } from "@/pages/BrowsePage.tsx";
import { ManageProfilesPage } from "@/pages/ManageProfilesPage.tsx";
import { AuthGuard } from "@/helpers/route/AuthGuard.tsx";
import { createRouteWithGuard } from "@/helpers/route/createRouteWithGuard.tsx";

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
    element: createRouteWithGuard({ routeGuard: AuthGuard, children: <BrowsePage /> }),
  },
  {
    path: "/manage",
    element: <ManageProfilesPage />,
  },
];
