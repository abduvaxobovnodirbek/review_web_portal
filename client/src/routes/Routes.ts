import Error from "../pages/main/Error";
import Home from "../pages/main/home/Home";
import Search from "../pages/main/home/Search";
import ReviewCreate from "../pages/main/review/ReviewCreate";
import Profile from "../pages/main/user/Profile";
import ReviewDetail from "../pages/main/review/ReviewDetail";
import UsersAllReviews from "../pages/main/review/UsersAllReviews";
import SavedReviews from "../pages/main/review/SavedReviews";
import SelfReviews from "../pages/main/user/SelfReviews";
import { routesType } from "../types";
import Tags from "../pages/main/home/Tags";
import Category from "../pages/main/home/Category";
import AdminPanel from "../pages/admin/AdminPanel";

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
    path: "/tag/:id",
    element: Tags,
    protected: false,
  },
  {
    path: "/category/:id",
    element: Category,
    protected: false,
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
    path: "/admin/panel",
    element: AdminPanel,
    protected: true,
  },
  {
    path: "*",
    element: Error,
    protected: false,
  },
];

export default routes;
