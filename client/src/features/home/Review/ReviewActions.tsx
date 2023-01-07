import { useLocation, useNavigate } from "react-router-dom";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import ShareIcon from "@mui/icons-material/Share";
import Tooltip from "@mui/material/Tooltip";
import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import Chip from "@mui/material/Chip";
import { message } from "antd";
import Cookies from "universal-cookie";
import { ReviewDetail } from "../../../types/api";
import { useLikeReviewMutation } from "../../../services/api/review";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { useInsertToBasketMutation } from "../../../services/api/basket";
import Spinner from "../../../components/spinner/Spinner";

const ReviewActions = ({ review }: { review: ReviewDetail }) => {
  const [likeReview, { isLoading: like_review_loading }] =
    useLikeReviewMutation();
  const [insertToBasket, { isLoading: insert_to_basket_loading }] =
    useInsertToBasketMutation();

  const { currentUser } = useAppSelector((state) => state.users);
  const cookie = new Cookies();
  const getCookie = cookie.get("user_basket");
  const location = useLocation();
  const navigate = useNavigate();

  const handleLikeReview = (e: any) => {
    e.stopPropagation();
    likeReview(review._id)
      .unwrap()
      .then(() => {
        message.success("review like has been updated successfully!");
        navigate(location.pathname);
      })
      .catch((err) => message.error("something went wrong try again!"));
  };

  const handleAddToBasket = (id: string) => {
    insertToBasket({ reviewId: id })
      .unwrap()
      .then(() => {
        cookie.set("user_basket", [...cookie.get("user_basket"), id]);
        message.success("Successfully inserted to saved reviews!");
        navigate(location.pathname);
      })
      .catch((err) => message.error("something went wrong try again!"));
  };

  return (
    <>
      {insert_to_basket_loading || like_review_loading ? (
        <Spinner isLoading={insert_to_basket_loading || like_review_loading} />
      ) : (
        ""
      )}
      <CardActions disableSpacing>
        <Tooltip title="Like" placement="top" className="!px-0">
          <>
            <IconButton
              disabled={!currentUser}
              aria-label="like button"
              sx={
                currentUser && review.likes.includes(currentUser?._id)
                  ? { color: "#03776f" }
                  : {}
              }
              onClick={handleLikeReview}
            >
              <ThumbUpRoundedIcon />
            </IconButton>
            <span>{review.likes.length ? review.likes.length : ""}</span>
          </>
        </Tooltip>
        {!getCookie?.includes(review?._id) ? (
          <Tooltip
            title="Save"
            placement="top"
            sx={currentUser ? { color: "#03776f" } : {}}
          >
            <span
              onClick={(e: any) => {
                e.stopPropagation();
                if (handleAddToBasket && currentUser?._id) {
                  handleAddToBasket(review?._id || "");
                }
              }}
            >
              <IconButton
                aria-label="save btn"
                disabled={!currentUser}
                sx={currentUser ? { color: "#03776f" } : {}}
                className="!mr-2"
              >
                <BookmarkAddIcon />
              </IconButton>
            </span>
          </Tooltip>
        ) : (
          ""
        )}

        <Tooltip title="Share" placement="top" sx={{ color: "black" }}>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Category" placement="top">
          <Chip
            label={review.category.name}
            component={"div"}
            className="!cursor-pointer"
          />
        </Tooltip>
      </CardActions>
    </>
  );
};

export default ReviewActions;
