import { Skeleton } from "antd";
import { useParams } from "react-router-dom";
import ReviewInfo from "../../components/review/ReviewInfo";
import Profile from "../../components/userProfile/Profile";
import useWindowSize from "../../hooks/useWindowSize";
import ContextWrapper from "../../layouts/ContextWrapper";
import { useGetReviewDetailQuery } from "../../services/api/review";

const ReviewDetail = () => {
  const { width } = useWindowSize();
  const { id } = useParams();
  const { data: review, isLoading: reviewLoading } = useGetReviewDetailQuery(
    id || ""
  );
  console.log(review, id);
  return (
    <ContextWrapper
      flexOptions={`justify-between items-start ${
        width < 900 ? "w-[95%]" : ""
      }`}
    >
      {reviewLoading ? (
        <div className="w-full flex flex-col items-center">
          <Skeleton.Image active className="!w-[90%] !h-[250px]" />
          <Skeleton active className="!w-[90%] mt-8" />
          <Skeleton active className="!w-[90%] mt-8" />
          <Skeleton active className="!w-[90%] mt-8" />
        </div>
      ) : (
        <ReviewInfo cardExist={true} width={width} review={review} />
      )}

      {width > 900 ? (
        <div className="w-[30%] border-l sticky top-0 min-h-screen">
          {reviewLoading ? (
            <div className="w-full flex flex-col items-center">
              <Skeleton.Image
                active
                className="!h-[150px] !w-[70%] !rounded-full"
              />
              <Skeleton active className="!w-[90%] mt-8" />
              <Skeleton active className="!w-[90%] mt-8" />
            </div>
          ) : (
            <Profile user={review?.user} />
          )}
        </div>
      ) : null}
    </ContextWrapper>
  );
};

export default ReviewDetail;
