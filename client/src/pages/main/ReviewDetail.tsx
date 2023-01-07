import { Skeleton } from "antd";
import { useParams } from "react-router-dom";
import { useGetReviewDetailQuery } from "../../services/api/review";
import { useAppSelector } from "../../hooks/useAppSelector";
import ReviewInfo from "../../components/review/ReviewInfo";
import UserProfile from "../../components/userProfile/UserProfile";
import useWindowSize from "../../hooks/useWindowSize";
import ContextWrapper from "../../layouts/ContextWrapper";

const ReviewDetail = () => {
  const { width } = useWindowSize();
  const { id } = useParams();
  const { currentUser } = useAppSelector((state) => state.users);
  const {
    data: review,
    isLoading: reviewLoading,
    refetch,
  } = useGetReviewDetailQuery(id || "");
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
        <ReviewInfo
          reviewActionExist={true}
          cardExist={true}
          width={width}
          review={review}
        />
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
            <UserProfile
              user={review?.user}
              refetch={refetch}
              showFollowBtn={
                (currentUser && currentUser._id) !== review?.user._id
              }
            />
          )}
        </div>
      ) : null}
    </ContextWrapper>
  );
};

export default ReviewDetail;
