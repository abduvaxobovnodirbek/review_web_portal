import { useSearchParams } from "react-router-dom";
import useWindowSize from "../../../hooks/useWindowSize";
import { useGetSearchedReviewsQuery } from "../../../services/api/search";
import ContextWrapper from "../../../layouts/ContextWrapper";
import TrendReviewList from "../../../features/home/TrendReviews/TrendReviewList";
import SearchList from "../../../features/search/SearchResultList";
import Sharing from "../../../features/home/Sharing/Sharing";

const Search = () => {
  const { width } = useWindowSize();
  const [searchParams] = useSearchParams();

  const { data, isLoading } = useGetSearchedReviewsQuery(
    searchParams.get("q") || ""
  );

  return (
    <div className="dark:min-h-screen">
      <ContextWrapper flexOptions={"justify-between items-start"}>
        <SearchList data={data} reviewLoading={isLoading} />
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

export default Search;
