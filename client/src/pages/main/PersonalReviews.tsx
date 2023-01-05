import { useState } from "react";
import Stepper from "../../features/createReview/Stepper/Stepper";
import EditForm from "../../features/PersonalReviews/EditForm";
import ReviewsTable from "../../features/PersonalReviews/ReviewsTable";
import { useAppSelector } from "../../hooks/useAppSelector";
import useWindowSize from "../../hooks/useWindowSize";
import ContextWrapper from "../../layouts/ContextWrapper";
import { useGetPersonalReviewsQuery } from "../../services/api/review";
import { ReviewDetail } from "../../types/api";

const PersonalReviews = () => {
  const { isLoading, data: reviews } = useGetPersonalReviewsQuery();
  const [showEditForm, setShowEditForm] = useState<boolean>(false);
  const { currentUser } = useAppSelector((state) => state.users);
  const [review, setReview] = useState<ReviewDetail | undefined>(undefined);
  const { width } = useWindowSize();

  return (
    <ContextWrapper flexOptions={"justify-center w-[95%] max-w-[1100px]"}>
      <div className="mx-4  w-[100%]">
        {currentUser && !showEditForm ? (
          <h3
            className="text-center text-xl font-serif text-white  shadow-md p-3 mb-8"
            style={{ background: "#03776f" }}
          >
            Reviews created by {currentUser?.name}
          </h3>
        ) : (
          ""
        )}
        {!showEditForm ? (
          <ReviewsTable
            reviews={reviews}
            isLoading={isLoading}
            setShowEditForm={setShowEditForm}
            setReview={setReview}
          />
        ) : (
          <ContextWrapper
            flexOptions={`w-[100%] ${
              width > 1000 ? "justify-between" : "flex-col items-center"
            }`}
          >
            <Stepper />
            <EditForm review={review} />
          </ContextWrapper>
        )}
      </div>
    </ContextWrapper>
  );
};

export default PersonalReviews;
