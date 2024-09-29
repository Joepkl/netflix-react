/** Vendor */
import { Navigate } from "react-router-dom";

/** Helpers */
import { createRouteWithGuard } from "@/helpers/route/createRouteWithGuard.tsx";
import { AuthGuard } from "@/helpers/route/AuthGuard.tsx";

/** Pages */
import { LoginPage } from "@/pages/LoginPage.tsx";
import { BrowsePage } from "@/pages/BrowsePage.tsx";
import { ManageProfilesPage } from "@/pages/ManageProfilesPage.tsx";
import { MovieDetailPage } from "@/pages/MovieDetailPage.tsx";

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
    path: "/manage",
    element: <ManageProfilesPage />,
  },
  {
    path: "/browse",
    element: createRouteWithGuard({ routeGuard: AuthGuard, children: <BrowsePage /> }),
  },
  {
    path: "/browse/:id",
    element: createRouteWithGuard({ routeGuard: AuthGuard, children: <MovieDetailPage /> }),
  },
];
