import ReviewList from "../../components/reviewList/ReviewList";
import TabMenu from "../../features/home/TabMenu";
import Wrapper from "../../features/home/Wrapper";
const Home = () => {
  return (
    <Wrapper>
      <TabMenu>
        <ReviewList />
      </TabMenu>
    </Wrapper>
  );
};

export default Home;
