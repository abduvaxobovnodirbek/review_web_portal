import Error from "../pages/main/Error";
import Home from "../pages/main/Home";
import Search from "../pages/main/Search";
import CreateReview from "../pages/main/CreateReview";

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
    path: "/create-review",
    element: CreateReview,
  },

  {
    path: "*",
    element: Error,
  },
];

export default routes;
