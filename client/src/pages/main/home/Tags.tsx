import { useParams } from "react-router-dom";
import Sharing from "../../../features/home/Sharing/Sharing";
import TrendReviewList from "../../../features/home/TrendReviews/TrendReviewList";
import ReviewTag from "../../../features/tag_category/ReviewTag";
import useWindowSize from "../../../hooks/useWindowSize";
import ContextWrapper from "../../../layouts/ContextWrapper";
import { useGetSelectedReviewsQuery } from "../../../services/api/search";

const Tags = () => {
  const params = useParams();
  const { width } = useWindowSize();

  const { data, isLoading } = useGetSelectedReviewsQuery({
    type: "tags",
    value: params.id || "",
  });

  return (
    <ContextWrapper flexOptions={"justify-between items-start"}>
      <ReviewTag data={data} reviewLoading={isLoading} />
      {width > 900 ? (
        <div className="w-[30%] border-l sticky top-0 min-h-screen">
          <TrendReviewList />
          <Sharing />
        </div>
      ) : null}
    </ContextWrapper>
  );
};

export default Tags;
