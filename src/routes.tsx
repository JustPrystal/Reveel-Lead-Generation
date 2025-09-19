import { createBrowserRouter } from "react-router-dom";
import GlobalLayout from "./layouts/globalLayout";
import MainSearchPage from "./pages/mainSearchPage";
import ViewResults from "./pages/viewResults";

interface RouteConfig {
  path?: string;
  element?: React.ReactNode;
  children?: RouteConfig[];
}

const routes: RouteConfig[] = [
  {
    path: "/",
    element: <MainSearchPage />,
  },
  {
    path: "/search",
    element: <ViewResults />,
  }
];

const router = createBrowserRouter([
  {
    path: "/",
    element: <GlobalLayout />,
    children: [
      {
        children: routes as RouteConfig[], // Pass the routes array as children
      },
    ],
  },
]);

export default router;
