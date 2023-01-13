import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { useTranslation } from "react-i18next";
import { useInsertToBasketMutation } from "../../../services/api/user/basket";
import Spinner from "../../../components/spinner/Spinner";
import FollowingReviews from "./FollowingReviews";
import RecentlyAddedReviews from "./RecentlyAddedReviews";
import TabPanel from "../../../components/TabPanel/TabPanel";


const ReviewList = ({ value }: any) => {
  const [insertToBasket, { isLoading }] = useInsertToBasketMutation();
  const cookie = new Cookies();
  const navigate = useNavigate();
  const {t} = useTranslation()
  
  const handleAddToBasket = (id: string) => {
    insertToBasket({ reviewId: id })
      .unwrap()
      .then(() => {
        cookie.set("user_basket", [...cookie.get("user_basket"), id]);
        message.success(t('105'));
        navigate("/");
      })
      .catch((err) => message.error(t('p31')));
  };

  return (
    <>
      {isLoading ? <Spinner isLoading={isLoading} /> : ""}
      <TabPanel value={value} index={0}>
        <RecentlyAddedReviews handleAddToBasket={handleAddToBasket} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <FollowingReviews handleAddToBasket={handleAddToBasket} />
      </TabPanel>
    </>
  );
};

export default ReviewList;
