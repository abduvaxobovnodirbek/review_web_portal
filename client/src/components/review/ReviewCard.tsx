import HTMLReactParser, { domToReact } from "html-react-parser";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { format } from "date-fns";
import ReviewActions from "../../features/home/Review/ReviewActions";
import useWindowSize from "../../hooks/useWindowSize";
import { ReviewDetail } from "../../types/api";
import CloudinaryImage from "./CloudinaryImage";

export default function ReviewCard({
  includeHead,
  review,
}: {
  includeHead: boolean;
  review?: ReviewDetail;
}) {
  const { width } = useWindowSize();
  const navigate = useNavigate();

  const options = {
    replace: (domeNode: any) => {
      if (!domeNode.attribs) {
        return;
      }

      if (domeNode) {
        return <p className="mr-1">{domToReact(domeNode.children, options)}</p>;
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
            review?.user.image ? (
              <Avatar>
                <img src={review?.user?.image} alt="avatar img" />
              </Avatar>
            ) : (
              <Avatar sx={{ background: "#00000064" }} aria-label="recipe">
                {review?.user.name.at(0)}
              </Avatar>
            )
          }
          title={review?.user.name}
          subheader={format(
            new Date(review?.createdAt || Date.now()),
            "MMM do. yyyy"
          )}
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
          <CloudinaryImage img={review.imageList[0]} />
        ) : (
          ""
        )}
      </div>

      {review ? <ReviewActions review={review} /> : ""}
    </Card>
  );
}
