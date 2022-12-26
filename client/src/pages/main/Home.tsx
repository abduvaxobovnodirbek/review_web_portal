import ReviewList from "../../components/review/ReviewList";
import Sharing from "../../features/home/Sharing/Sharing";
import TabMenu from "../../features/home/Tab/TabMenu";
import TrendReviews from "../../features/home/TrendReviews/TrendReviewList";
import Wrapper from "../../layouts/ContextWrapper";
import useWindowSize from "../../hooks/useWindowSize";

const Home = () => {
  const { width } = useWindowSize();

  return (
    <Wrapper flexOptions={"justify-between items-start"}>
      <TabMenu>
        <ReviewList />
      </TabMenu>
      {width > 900 ? (
        <div className="w-[30%] border-l sticky top-0 min-h-screen">
          <TrendReviews />
          <Sharing />
        </div>
      ) : null}
    </Wrapper>
  );
};

export default Home;
