import { Skeleton } from "antd";
import { useTranslation } from "react-i18next";
import { useGetTrendReviewsQuery } from "../../../services/api/review/trendReviews";
import { ReviewDetail } from "../../../types/api";
import TrendReviewCard from "./TrendReviewCard";

const TrendReviewList = () => {
  const trendReviewFunc = useGetTrendReviewsQuery();
  const reviews = trendReviewFunc?.data ?? [];
  const { t } = useTranslation();

  const SkeletonElement = () => (
    <Skeleton loading={trendReviewFunc.isLoading} active className="mb-14" />
  );

  return (
    <>
      <h3
        style={{ background: "#03776f", color: "white" }}
        className="p-2 font-serif font-bold"
      >
        {t("p36")}
      </h3>
      <SkeletonElement />
      <SkeletonElement />
      <SkeletonElement />
      {reviews.map((review: ReviewDetail, i: number) => (
        <TrendReviewCard review={review} key={i} />
      ))}
    </>
  );
};

export default TrendReviewList;
