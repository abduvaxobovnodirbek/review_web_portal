import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { message, Skeleton } from "antd";
import { useGetReviewsQuery } from "../../../services/api/review";
import { TabPanelProps } from "../../../types";
import { ReviewDetail } from "../../../types/api";
import ReviewCard from "../../../components/review/ReviewCard";
import { useInsertToBasketMutation } from "../../../services/api/basket";
import Spinner from "../../../components/spinner/Spinner";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

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
  const [page, setPage] = useState<number>(1);
  const getReviewsFunc = useGetReviewsQuery(page);
  const [insertToBasket, { isLoading }] = useInsertToBasketMutation();
  const reviews = getReviewsFunc?.data?.data ?? [];
  const cookie = new Cookies();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => {
      const scrolledToBottom =
        window.innerHeight + window.scrollY + 400 >= document.body.offsetHeight;
      if (scrolledToBottom && !getReviewsFunc.isFetching) {
        console.log("Fetching more data...");
        setPage(page + 1);
      }
    };

    document.addEventListener("scroll", onScroll);

    return function () {
      document.removeEventListener("scroll", onScroll);
    };
  }, [page, getReviewsFunc.isFetching]);

  const handleAddToBasket = async (id: string) => {
    await insertToBasket({ reviewId: id })
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
        <Skeleton
          loading={getReviewsFunc.isLoading}
          avatar
          active
          className="mb-14"
        />
        <Skeleton
          loading={getReviewsFunc.isLoading}
          avatar
          active
          className="mb-14"
        />
        <Skeleton
          loading={getReviewsFunc.isLoading}
          avatar
          active
          className="mb-14"
        />
        <Skeleton
          loading={getReviewsFunc.isLoading}
          avatar
          active
          className="mb-14"
        />
        {reviews.map((review: ReviewDetail, i: number) => (
          <ReviewCard
            includeSaveBtn={true}
            includeHead={true}
            review={review}
            key={i}
            handleAddToBasket={handleAddToBasket}
          />
        ))}
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ReviewCard includeSaveBtn={true} includeHead={true} />
      </TabPanel>
    </>
  );
};

export default ReviewList;
