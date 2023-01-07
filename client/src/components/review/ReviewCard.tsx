import HTMLReactParser, { domToReact } from "html-react-parser";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { format } from "date-fns";
import { Chip, IconButton, Tooltip } from "@mui/material";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import useWindowSize from "../../hooks/useWindowSize";
import { ReviewDetail } from "../../types/api";
import { useAppSelector } from "../../hooks/useAppSelector";
import Cloudinary from "../CloudImage/Cloudinary";

export default function ReviewCard({
  includeHead,
  review,
  includeSaveBtn,
  handleAddToBasket,
}: {
  includeHead: boolean;
  review?: ReviewDetail;
  handleAddToBasket?: (str: string) => void;
  includeSaveBtn: boolean;
}) {
  const cookie = new Cookies();

  const { currentUser } = useAppSelector((state) => state.users);
  const { width } = useWindowSize();
  const navigate = useNavigate();

  const options = {
    replace: (domeNode: any) => {
      if (!domeNode.attribs) {
        return;
      }

      if (domeNode) {
        return <span className="mr-1">{domToReact(domeNode.children, options)}</span>;
      }
    },
  };

  return (
    <Card
      sx={{ maxWidth: "100%" }}
      className="mb-2 cursor-pointer"
      elevation={0}
      onClick={() => navigate(`/reviews/${review?._id}`)}
    >
      {includeHead ? (
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
          subheader={format(
            new Date(review?.createdAt || Date.now()),
            "MMM do. yyyy"
          )}
          action={
            includeSaveBtn &&
            !cookie.get("user_basket")?.includes(review?._id) ? (
              <Tooltip title="Save" placement="top">
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
            )
          }
          className="!px-0"
        />
      ) : (
        ""
      )}

      <div
        className={`flex items-center ${
          width > 576 ? "justify-between" : "!flex-col"
        }`}
      >
        <div>
          <CardContent className="!px-0">
            <Typography
              variant="body1"
              color="text.primary"
              className="!font-bold !text-lg"
            >
              {review?.review_name}
            </Typography>
          </CardContent>
          <CardContent className="!px-0">
            <div className="flex flex-wrap font-serif text-sm">
              {HTMLReactParser(
                review?.description.slice(0, 300) || "",
                options
              )}
            </div>
          </CardContent>
        </div>

        {review?.imageList.length ? (
          <div
            className={`${
              width > 576 ? "w-[350px] h-[120px]" : "w-[100%] h-[220px]"
            }`}
          >
            <Cloudinary img={review.imageList[0]} />
          </div>
        ) : (
          ""
        )}
      </div>

      {review && review.category.name ? (
        <div className="flex justify-between items-center border-b pb-1">
          <span className="font-serif text-gray-500 text-sm">
            review category
          </span>
          <Tooltip title="Category" placement="top">
            <Chip
              label={review.category.name}
              component={"div"}
              className="!cursor-pointer !px-4 !py-0 ml-2"
            />
          </Tooltip>
        </div>
      ) : (
        ""
      )}
    </Card>
  );
}
