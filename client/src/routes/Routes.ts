import Error from "../pages/main/Error";
import Home from "../pages/main/Home";
import Search from "../pages/main/Search";
import ReviewCreate from "../pages/main/ReviewCreate";
import Profile from "../pages/main/Profile";
import ReviewDetail from "../pages/main/ReviewDetail";
import UsersAllReviews from "../pages/main/UsersAllReviews";
import SavedReviews from "../pages/main/SavedReviews";
import SelfReviews from "../pages/main/SelfReviews";
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
    path: "/reviews/:id",
    element: ReviewDetail,
    protected: false,
  },
  {
    path: "/user-all-reviews/:id",
    element: UsersAllReviews,
    protected: false,
  },
  {
    path: "/review-create",
    element: ReviewCreate,
    protected: true,
  },
  {
    path: "/profile",
    element: Profile,
    protected: true,
  },
  {
    path: "/self-reviews",
    element: SelfReviews,
    protected: true,
  },
  {
    path: "/saved-reviews",
    element: SavedReviews,
    protected: true,
  },
  {
    path: "*",
    element: Error,
    protected: false,
  },
];

export default routes;
