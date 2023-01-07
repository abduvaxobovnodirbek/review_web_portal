import HTMLReactParser, { domToReact } from "html-react-parser";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { ReviewDetail } from "../../../types/api";
import Cloudinary from "../../../components/CloudImage/Cloudinary";

export default function TrendReviewCard({ review }: { review: ReviewDetail }) {
  const navigate = useNavigate();

  const options = {
    replace: (domeNode: any) => {
      if (!domeNode.attribs) {
        return;
      }

      if (domeNode) {
        return (
          <span className="mr-1">{domToReact(domeNode.children, options)}</span>
        );
      }
    },
  };

  return (
    <Card
      className="mb-1 cursor-pointer"
      elevation={0}
      onClick={() => navigate(`/reviews/${review?._id}`)}
    >
      <CardHeader
        avatar={
          review?.user?.image ? (
            <div
              className="w-[35px] h-[35px] rounded-full overflow-hidden cursor-pointer"
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
      />

      <CardContent>
        <Typography
          variant="body1"
          color="text.primary"
          className="!font-bold !text-sm"
        >
          {review?.review_name}
        </Typography>
      </CardContent>
      <CardContent>
        <div className="flex flex-wrap font-serif text-sm  border-b pb-1">
          {HTMLReactParser(review?.description.slice(0, 150) || "", options)}
        </div>
      </CardContent>
    </Card>
  );
}
