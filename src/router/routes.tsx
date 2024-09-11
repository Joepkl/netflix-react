/** Pages */
import App from "@/pages/Home.tsx";
import Test from "@/pages/Test.tsx";

/** Routes */
export const ROUTES = [
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/page1",
    element: <Test />,
  },
];
