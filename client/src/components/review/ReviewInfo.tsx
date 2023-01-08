import { Avatar, CardHeader, Stack } from "@mui/material";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { ReviewDetail } from "../../types/api";
import ImageCarousel from "../carousel/ImageCarousel";
import TextEditor from "../Editor/TextEditor";
import Grade from "../grade/Grade";
import Tag from "../tag/Tag";
import ReviewActions from "../../features/home/Review/ReviewActions";
import Cloudinary from "../CloudImage/Cloudinary";
import GradeForArt from "../../features/gradeForArt/GradeForArt";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useEffect, useState } from "react";

import GradeText from "./GradeText";
import Comments from "../../features/comments/Comments";

const ReviewInfo = ({
  width,
  review,
  cardExist,
  reviewActionExist,
}: {
  width: number;
  cardExist: boolean;
  reviewActionExist: boolean;
  review: ReviewDetail | undefined;
}) => {
  const navigate = useNavigate();
  const { currentUser } = useAppSelector((state) => state.users);
  const [grade, setGrade] = useState<number>(0);
  const [showRate, setShowRate] = useState<boolean>(false);

  useEffect(() => {
    review?.rating.map((each) => {
      if (each.user === currentUser?._id) {
        setGrade(each.userGrade);
        return each.user;
      }
      return null;
    });
    setShowRate(true);
  }, [currentUser?._id, review?.rating]);

  return (
    <div className={`${width < 900 ? "w-[100%]" : "w-[70%]"} p-4`}>
      {cardExist ? (
        <CardHeader
          avatar={
            review?.user.image ? (
              <Avatar>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/user-all-reviews/${review?.user._id}`);
                  }}
                >
                  <Cloudinary img={review?.user?.image} />
                </div>
              </Avatar>
            ) : (
              <Avatar sx={{ background: "#00000064" }} aria-label="recipe">
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/user-all-reviews/${review?.user._id}`);
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
      ) : (
        ""
      )}

      <h2 className="font-serif tracking-wider ml-3 p-3 mb-2 flex flex-col  text-lg font-bold text-center">
        <span>{review?.review_name}</span>
        <span className="text-gray-400">({review?.reviewed_art})</span>
      </h2>

      {review?.imageList.length ? (
        <ImageCarousel images={review?.imageList} />
      ) : (
        ""
      )}

      <TextEditor
        displayMode={"PREVIEW"}
        createReview={false}
        review={review?.description || ""}
      />

      <div
        className={`ml-4 flex justify-between items-end ${
          width < 700 ? "flex-col !items-start !justify-end" : ""
        }`}
      >
        <div>
          <p className="text-gray-600 text-sm font-serif relative top-5">
            Review Author grade for{" "}
            <b className="ml-1 italic">{review?.reviewed_art}</b>{" "}
          </p>
          <Grade
            createReview={false}
            disabled={true}
            authorGrade={true}
            defaultValue={review?.authorGrade || 1}
            count={10}
          />
        </div>
        {reviewActionExist ? (
          <div className="relative -left-5 -top-4">
            <ReviewActions review={review as ReviewDetail} />
          </div>
        ) : (
          ""
        )}
      </div>

      {(currentUser && currentUser._id) !== review?.user._id && showRate ? (
        <div className="flex flex-col ml-4">
          <GradeText currentUser={currentUser} review={review} />
          <GradeForArt
            currentUser={currentUser}
            reviewId={review?._id || ""}
            grade={grade}
          />
        </div>
      ) : (
        ""
      )}

      <Stack direction="row" spacing={1} className={`ml-4 flex`}>
        {review?.tags.map((tag: string, i: number) => (
          <Tag key={i} label={tag} />
        ))}
      </Stack>

      <Comments reviewId={review?._id} currentUser={currentUser} />
    </div>
  );
};

export default ReviewInfo;
