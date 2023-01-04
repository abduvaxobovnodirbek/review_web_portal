import { Avatar, CardHeader, Stack } from "@mui/material";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import ImageCarousel from "../../components/carousel/ImageCarousel";
import TextEditor from "../../components/Editor/TextEditor";
import Grade from "../../components/grade/Grade";
import Tag from "../../components/tag/Tag";
import ReviewActions from "../../features/home/Review/ReviewActions";
import { ReviewDetail } from "../../types/api";

const ReviewInfo = ({
  width,
  review,
}: {
  width: number;
  review: ReviewDetail | undefined;
}) => {
  const navigate = useNavigate();
  return (
    <div className={`${width < 900 ? "w-[100%]" : "w-[70%]"} p-4`}>
      <CardHeader
        avatar={
          review?.user.image ? (
            <Avatar>
              <img
                src={review?.user?.image}
                alt="avatar img"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/user-reviews/${review?.user._id}`);
                }}
              />
            </Avatar>
          ) : (
            <Avatar sx={{ background: "#00000064" }} aria-label="recipe">
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/user-reviews/${review?.user._id}`);
                }}
              >
                {review?.user.name.at(0)}
              </span>
            </Avatar>
          )
        }
        title={review?.user?.name}
        subheader={format(
          new Date(review?.createdAt || Date.now()),
          "MMM do. yyyy"
        )}
        action={<ReviewActions review={review as ReviewDetail} />}
      />

      <h2 className="font-serif tracking-wider ml-3 p-3 mb-2 flex flex-col  text-lg font-bold text-center">
        <span>{review?.review_name}</span>
        <span className="text-gray-400">({review?.reviewed_art})</span>
      </h2>

      {review?.imageList.length ? (
        <ImageCarousel images={review?.imageList} cloudImages={true} />
      ) : (
        ""
      )}

      <TextEditor
        displayMode={"PREVIEW"}
        createReview={false}
        review={review?.description || ""}
      />

      <div
        className={`ml-4 flex justify-between items-center ${
          width < 600 ? "flex-col" : ""
        }`}
      >
        <Grade
          createReview={false}
          disabled={true}
          authorGrade={true}
          defaultValue={review?.authorGrade || 1}
          count={10}
        />
        <ReviewActions review={review as ReviewDetail} />
      </div>

      <Stack direction="row" spacing={1} className={`ml-4 flex`}>
        {review?.tags.map((tag: string, i: number) => (
          <Tag key={i} label={tag} />
        ))}
      </Stack>
    </div>
  );
};

export default ReviewInfo;
