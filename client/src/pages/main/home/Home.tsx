import ReviewList from "../../../features/home/Review/ReviewList";
import Sharing from "../../../features/home/Sharing/Sharing";
import TabMenu from "../../../features/home/Tab/TabMenu";
import TrendReviews from "../../../features/home/TrendReviews/TrendReviewList";
import Wrapper from "../../../layouts/ContextWrapper";
import useWindowSize from "../../../hooks/useWindowSize";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { width } = useWindowSize();
  const {t} = useTranslation()
  return (
    <Wrapper flexOptions={"justify-between items-start"}>
      <TabMenu
        tabOptions={{
          names: [t("p32"), t("p33")],
        }}
      >
        <ReviewList detailed={true} />
      </TabMenu>
      {width > 900 ? (
        <div className="w-[30%] border-l sticky top-0 min-h-screen dark:!text-white">
          <TrendReviews />
          <Sharing />
        </div>
      ) : null}
    </Wrapper>
  );
};

export default Home;
