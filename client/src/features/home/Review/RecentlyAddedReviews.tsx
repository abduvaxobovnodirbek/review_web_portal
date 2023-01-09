import { Skeleton } from "antd";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ReviewCard from "../../../components/review/ReviewCard";
import { useGetReviewsQuery } from "../../../services/api/review/review";
import { ReviewDetail } from "../../../types/api";

const RecentlyAddedReviews = ({
  handleAddToBasket,
}: {
  handleAddToBasket: (str: string) => void;
}) => {
  const [page, setPage] = useState<number>(1);
  const getReviewsFunc = useGetReviewsQuery(page);

  const reviews = getReviewsFunc?.data?.data ?? [];
  const functionNext = () => {
    if (getReviewsFunc.data?.nextPage) {
      setPage(getReviewsFunc.data.pagination.next?.page || 1);
    }
  };

  const SkeletonElement = () => (
    <Skeleton
      loading={getReviewsFunc.isLoading}
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
        {reviews.map((review: ReviewDetail, i: number) => (
          <ReviewCard
            includeSaveBtn={true}
            includeHead={true}
            review={review}
            key={i}
            handleAddToBasket={handleAddToBasket}
          />
        ))}
      </InfiniteScroll>
    </>
  );
};

export default RecentlyAddedReviews;
