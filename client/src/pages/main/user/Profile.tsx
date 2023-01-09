import { Skeleton } from "antd";
import { VscPreview } from "react-icons/vsc";
import { FaUserEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useGetPersonalReviewsQuery } from "../../../services/api/review/review";
import { ReviewDetail } from "../../../types/api";
import { toggleProfileModal } from "../../../services/ui/modalSlice";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import ReviewCard from "../../../components/review/ReviewCard";
import UserProfile from "../../../components/userProfile/UserProfile";
import useWindowSize from "../../../hooks/useWindowSize";
import ContextWrapper from "../../../layouts/ContextWrapper";
import ProfileModal from "../../../features/profile/ProfileModal";

const Profile = () => {
  const { isLoading, data: reviews, refetch } = useGetPersonalReviewsQuery();
  const { width } = useWindowSize();
  const { currentUser } = useAppSelector((state) => state.users);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(toggleProfileModal(true));
  };

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
            <FaUserEdit
              onClick={handleClick}
              className="absolute right-12 !cursor-pointer"
              fontSize={30}
              color="gray"
            />
            <UserProfile
              refetch={refetch}
              showFollowBtn={false}
              user={currentUser || undefined}
            />
          </>
        ) : null}
        {width > 576 ? (
          <h2 className="text-3xl font-bold font-serif mb-6 border-b-2 px-2 pb-4 mt-4 border-dotted border-b-gray-500">
            {currentUser?.name}
          </h2>
        ) : (
          <h2 className="text-xl font-bold font-serif mb-6 border-b-2 text-gray-500 mt-6 pb-2 border-b-gray-500 border-dotted">
            Reviews
          </h2>
        )}
        {reviews?.length ? (
          reviews?.map((review: ReviewDetail, i: number) => (
            <ReviewCard
              includeSaveBtn={true}
              includeHead={false}
              review={review}
              key={i}
            />
          ))
        ) : reviews?.length === 0 ? (
          <div
            className="flex flex-col items-center shadow-md cursor-pointer"
            onClick={() => navigate("/review-create")}
          >
            <VscPreview fontSize={100} color="gray" />
            <h2 className="text-xl font-bold font-serif italic text-gray-400  px-2 pb-4 mt-4">
              Create a new review
            </h2>
          </div>
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
          <FaUserEdit
            onClick={handleClick}
            className="absolute right-0 !cursor-pointer"
            fontSize={30}
            color="gray"
          />
          <UserProfile
            refetch={refetch}
            user={currentUser || undefined}
            showFollowBtn={false}
          />
        </div>
      ) : null}
    </ContextWrapper>
  );
};

export default Profile;
