/** Vendor */
import { Navigate } from "react-router-dom";

/** Local */
import { useAppSelector } from "@/store/hooks.ts";

/** Component */
const AuthGuard = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = useAppSelector((state) => state.app.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export { AuthGuard };
