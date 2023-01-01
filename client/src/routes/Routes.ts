import Error from "../pages/main/Error";
import Home from "../pages/main/Home";
import Search from "../pages/main/Search";
import CreateReview from "../pages/main/CreateReview";

import { routesType } from "../types";

const routes: routesType = [
  {
    path: "/",
    element: Home,
    protected: false,
  },
  {
    path: "/search",
    element: Search,
    protected: false,
  },
  {
    path: "/create-review",
    element: CreateReview,
    protected: true,
  },

  {
    path: "*",
    element: Error,
    protected: false,
  },
];

export default routes;
