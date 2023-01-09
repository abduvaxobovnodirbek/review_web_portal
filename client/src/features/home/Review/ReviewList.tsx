import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { message } from "antd";
import { TabPanelProps } from "../../../types";
import { useInsertToBasketMutation } from "../../../services/api/user/basket";
import Spinner from "../../../components/spinner/Spinner";
import FollowingReviews from "./FollowingReviews";
import RecentlyAddedReviews from "./RecentlyAddedReviews";

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const ReviewList = ({ value }: any) => {
  const [insertToBasket, { isLoading }] = useInsertToBasketMutation();
  const cookie = new Cookies();
  const navigate = useNavigate();

  const handleAddToBasket = (id: string) => {
    insertToBasket({ reviewId: id })
      .unwrap()
      .then(() => {
        cookie.set("user_basket", [...cookie.get("user_basket"), id]);
        message.success("Successfully inserted to saved reviews!");
        navigate("/");
      })
      .catch((err) => message.error("something went wrong try again!"));
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
