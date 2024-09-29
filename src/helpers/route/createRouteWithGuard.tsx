/** Type */
type createRouteWithGuardType = {
  routeGuard?: React.ElementType;
  children: React.ReactNode;
};

/** Helper */
const createRouteWithGuard = ({ routeGuard: RouteGuard, children }: createRouteWithGuardType) => {
  if (RouteGuard) {
    return <RouteGuard>{children}</RouteGuard>;
  }

  return children;
};

export { createRouteWithGuard };
