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
import { useLocation, useNavigate } from "react-router-dom";

const ReviewActions = ({ review }: { review: ReviewDetail }) => {
  const [likeReview] = useLikeReviewMutation();
  const { currentUser } = useAppSelector((state) => state.users);
  const [insertToBasket, { isLoading }] = useInsertToBasketMutation();
  const cookie = new Cookies();
  const getCookie = cookie.get("user_basket");
  const location = useLocation();
  const navigate = useNavigate();

  const handleLikeReview = async (e: any) => {
    e.stopPropagation();
    await likeReview(review._id);
  };

  const handleAddToBasket = async (id: string) => {
    await insertToBasket({ reviewId: id })
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
      {isLoading ? <Spinner isLoading={isLoading} /> : ""}
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
            <IconButton
              aria-label="save btn"
              disabled={!currentUser}
              onClick={(e: any) => {
                e.stopPropagation();
                if (handleAddToBasket) {
                  handleAddToBasket(review?._id || "");
                }
              }}
            >
              <BookmarkAddIcon />
            </IconButton>
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
