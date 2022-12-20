import Error from "../pages/main/Error";
import Home from "../pages/main/Home";
import Search from "../pages/main/Search";
import { routesType } from "../types";

const routes: routesType = [
  {
    path: "/",
    element: Home,
  },
  {
    path: "/search",
    element: Search,
  },
  {
    path: "*",
    element: Error,
  },
];

export default routes;
