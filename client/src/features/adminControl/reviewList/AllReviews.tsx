import { useState } from "react";
import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { ReviewDetail } from "../../../types/api";
import ReviewsTable from "./ReviewsTable";
import { useGetAllReviewsQuery } from "../../../services/api/admin/admin";
import Stepper from "../../reviewCreate/Stepper/Stepper";
import EditForm from "../../selfReviews/EditForm";
import ContextWrapper from "../../../layouts/ContextWrapper";
import useWindowSize from "../../../hooks/useWindowSize";


const AllReviews = () => {
  const { isLoading, data: reviews } = useGetAllReviewsQuery();
  const [showEditForm, setShowEditForm] = useState<boolean>(false);
  const [review, setReview] = useState<ReviewDetail | undefined>(undefined);
  const { width } = useWindowSize();
  const { t } = useTranslation();

  return (
    <Box sx={{ width: "100%" }}>
      {!showEditForm ? (
        <>
          <h3
            className="text-center text-xl font-serif text-white  shadow-md p-3 mb-8"
            style={{ background: "#03776f" }}
          >
            {t("p83")}
          </h3>
          <ReviewsTable
            reviews={reviews}
            isLoading={isLoading}
            setShowEditForm={setShowEditForm}
            setReview={setReview}
          />
        </>
      ) : (
        <ContextWrapper
          flexOptions={`w-[100%] ${
            width > 1000 ? "justify-between" : "flex-col items-center"
          }`}
        >
          <Stepper />
          <EditForm review={review} setShowEditForm={setShowEditForm} />
        </ContextWrapper>
      )}
    </Box>
  );
};

export default AllReviews;
