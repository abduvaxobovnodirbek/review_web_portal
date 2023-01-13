import { Star } from "@mui/icons-material";
import { AlertTitle, Alert } from "@mui/material";
import { Skeleton } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import InfiniteScroll from "react-infinite-scroll-component";
import ReviewCard from "../../../components/review/ReviewCard";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { useGetFollowingReviewsQuery } from "../../../services/api/review/review";
import { ReviewDetail } from "../../../types/api";

const FollowingReviews = ({
  handleAddToBasket,
}: {
  handleAddToBasket: (str: string) => void;
}) => {
  const [page, setPage] = useState<number>(1);
  const getFollowingReviewFunc = useGetFollowingReviewsQuery(page);
  const followingReviews = getFollowingReviewFunc?.data?.data ?? [];
  const { currentUser } = useAppSelector((state) => state.users);
  const { t } = useTranslation();

  const functionNext = () => {
    if (getFollowingReviewFunc.data?.nextPage) {
      setPage(getFollowingReviewFunc.data.pagination.next?.page || 1);
    }
  };

  const SkeletonElement = () => (
    <Skeleton
      loading={getFollowingReviewFunc.isLoading}
      avatar
      active
      className="mb-14"
    />
  );

  return (
    <>
      <SkeletonElement />
      <SkeletonElement />
      <SkeletonElement />
      <SkeletonElement />
      <InfiniteScroll
        dataLength={page * 10}
        next={functionNext}
        hasMore={true}
        loader={<></>}
      >
        {followingReviews.length ? (
          followingReviews.map((review: ReviewDetail, i: number) => (
            <ReviewCard
              includeSaveBtn={true}
              includeHead={true}
              review={review}
              key={i}
              handleAddToBasket={handleAddToBasket}
            />
          ))
        ) : currentUser?._id ? (
          <div className="text-gray-600 font-serif shadow-md flex justify-center flex-col items-center">
            <Star className="text-gray-200" sx={{ fontSize: "100px" }} />
            <div className="text-center">
              <h3>{t("p40")}</h3>
              <p>{t("p41")}</p>
            </div>
          </div>
        ) : (
          <Alert severity="info">
            <AlertTitle>Info</AlertTitle>
            {t("p39")}
          </Alert>
        )}
      </InfiniteScroll>
    </>
  );
};

export default FollowingReviews;
