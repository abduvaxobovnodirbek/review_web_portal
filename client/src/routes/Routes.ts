import Error from "../pages/main/Error";
import Home from "../pages/main/Home";
import Search from "../pages/main/Search";
import CreateReview from "../pages/main/CreateReview";
import UserProfile from "../pages/main/UserProfile";
import ReviewDetail from "../pages/main/ReviewDetail";
import { routesType } from "../types";
import UserReviews from "../pages/main/OtherUserReviews";
import SavedReviews from "../pages/main/SavedReviews";
import PersonalReviews from "../pages/main/PersonalReviews";

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
    path: "/user-profile",
    element: UserProfile,
    protected: true,
  },
  {
    path: "/personal-reviews",
    element: PersonalReviews,
    protected: true,
  },
  {
    path: "/user-reviews/:id",
    element: UserReviews,
    protected: false,
  },
  {
    path: "/saved-reviews",
    element: SavedReviews,
    protected:true,
  },
  {
    path: "/reviews/:id",
    element: ReviewDetail,
    protected: false,
  },
  {
    path: "*",
    element: Error,
    protected: false,
  },
];

export default routes;
