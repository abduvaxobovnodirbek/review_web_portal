import { useParams } from "react-router-dom";
import Sharing from "../../../features/home/Sharing/Sharing";
import TrendReviewList from "../../../features/home/TrendReviews/TrendReviewList";
import ReviewCategory from "../../../features/tag_category/ReviewCategory";
import useWindowSize from "../../../hooks/useWindowSize";
import ContextWrapper from "../../../layouts/ContextWrapper";
import { useGetSelectedReviewsQuery } from "../../../services/api/search";

const Category = () => {
  const params = useParams();
  const { width } = useWindowSize();

  const { data, isLoading } = useGetSelectedReviewsQuery({
    type: "category",
    value: params.id || "",
  });

  return (
    <div className="dark:min-h-screen">
    <ContextWrapper flexOptions={"justify-between items-start"}>
      <ReviewCategory data={data} reviewLoading={isLoading} />
      {width > 900 ? (
        <div className="w-[30%] border-l sticky top-0 min-h-screen">
          <TrendReviewList />
          <Sharing />
        </div>
      ) : null}
    </ContextWrapper>
    </div>
  );
};

export default Category;
