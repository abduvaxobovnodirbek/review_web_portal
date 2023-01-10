import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { Avatar, CardHeader, IconButton, Tooltip } from "@mui/material";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import Cloudinary from "../CloudImage/Cloudinary";
import { ReviewDetail, User } from "../../types/api";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { toggleModal } from "../../services/ui/modalSlice";

const CardHead = ({
  review,
  includeSaveBtn,
  currentUser,
  handleAddToBasket,
}: {
  review: ReviewDetail | undefined;
  includeSaveBtn: boolean;
  currentUser: User|null;
  handleAddToBasket: ((str: string) => void) | undefined;
}) => {
  const navigate = useNavigate();
  const cookie = new Cookies();
  const dispatch = useAppDispatch()
  return (
    <>
      <CardHeader
        avatar={
          review?.user?.image ? (
            <div
              className="w-[35px] h-[35px] rounded-full overflow-hidden"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/user-all-reviews/${review?.user._id}`);
              }}
            >
              <Cloudinary img={review?.user?.image} />
            </div>
          ) : (
            <Avatar sx={{ background: "#00000064" }} aria-label="recipe">
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/user-all-reviews/${review?.user._id}`);
                }}
              >
                {review?.user?.name?.at(0)}
              </span>
            </Avatar>
          )
        }
        title={review?.user?.name}
        subheader={<span className = "dark:text-gray-400">{format(
          new Date(review?.createdAt || Date.now()),
          "MMM do. yyyy"
        )}</span>}
        action={
          includeSaveBtn &&
          !cookie.get("user_basket")?.includes(review?._id) ? (
            <Tooltip title="Save" placement="top">
              <span
                onClick={(e: any) => {
                  e.stopPropagation();
                  if (handleAddToBasket && currentUser?._id) {
                    handleAddToBasket(review?._id || "");
                  }else{
                    dispatch(toggleModal(true))
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
          )
        }
        className="!px-0"
      />
    </>
  );
};

export default CardHead;
