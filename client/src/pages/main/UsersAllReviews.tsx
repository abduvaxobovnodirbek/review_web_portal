import { Skeleton } from "antd";
import { useParams } from "react-router-dom";
import { useGetUserAllReviewsQuery } from "../../services/api/review";
import { useAppSelector } from "../../hooks/useAppSelector";
import ReviewCard from "../../components/review/ReviewCard";
import Profile from "../../components/userProfile/UserProfile";
import useWindowSize from "../../hooks/useWindowSize";
import ContextWrapper from "../../layouts/ContextWrapper";
import { ReviewDetail } from "../../types/api";
import ProfileModal from "../../features/profile/ProfileModal";

const UsersAllReviews = () => {
  const { id } = useParams();
  const { isLoading, data: reviews,refetch } = useGetUserAllReviewsQuery(id || "");
  const { currentUser } = useAppSelector((state) => state.users);

  const { width } = useWindowSize();
  return (
    <ContextWrapper
      flexOptions={`justify-between items-start ${
        width < 900 ? "w-[95%]" : ""
      }`}
    >
      <ProfileModal />

      <div className={`${width < 900 ? "w-[100%]" : "w-[90%]"} p-4`}>
        {width < 900 ? (
          <>
            {" "}
            <Profile
             refetch = {refetch}
              user={reviews?.data?.user || undefined}
              showFollowBtn={
                (currentUser && currentUser._id) !== reviews?.data?.user._id
              }
            />
          </>
        ) : null}
        {width > 576 ? (
          <h2 className="text-3xl font-bold font-serif mb-6 border-b-2 px-2 pb-4 mt-4 border-dotted border-b-gray-500">
            {reviews?.data?.user.name}
          </h2>
        ) : (
          <h2 className="text-xl font-bold font-serif mb-6 border-b-2 text-gray-500 mt-6 pb-2 border-b-gray-500 border-dotted">
            Reviews
          </h2>
        )}
        {reviews?.data?.reviews.length ? (
          reviews?.data?.reviews?.map((review: ReviewDetail, i: number) => (
            <ReviewCard
              includeSaveBtn={true}
              includeHead={false}
              review={review}
              key={i}
            />
          ))
        ) : (
          <>
            <Skeleton loading={isLoading} avatar active className="mb-14" />
            <Skeleton loading={isLoading} avatar active className="mb-14" />
            <Skeleton loading={isLoading} avatar active className="mb-14" />
          </>
        )}
      </div>

      {width > 900 ? (
        <div className="w-[40%] border-l sticky top-0 min-h-screen">
          <Profile
           refetch = {refetch}
            user={reviews?.data?.user || undefined}
            showFollowBtn={
              (currentUser && currentUser._id) !== reviews?.data?.user._id
            }
          />
        </div>
      ) : null}
    </ContextWrapper>
  );
};

export default UsersAllReviews;
