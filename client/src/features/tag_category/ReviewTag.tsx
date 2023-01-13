import { message, Skeleton } from "antd";
import { useTranslation } from "react-i18next";
import { AiFillTag } from "react-icons/ai";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Cookies from "universal-cookie";
import ReviewCard from "../../components/review/ReviewCard";
import Spinner from "../../components/spinner/Spinner";
import useWindowSize from "../../hooks/useWindowSize";
import { useInsertToBasketMutation } from "../../services/api/user/basket";
import { ReviewDetail } from "../../types/api";

const ReviewTag = ({
  data,
  reviewLoading,
}: {
  data: ReviewDetail[] | undefined;
  reviewLoading: boolean;
}) => {
  const cookie = new Cookies();
  const navigate = useNavigate();
  const location = useLocation();
  const { width } = useWindowSize();
  const params = useParams();
  const { t } = useTranslation();
  const [insertToBasket, { isLoading }] = useInsertToBasketMutation();

  const SkeletonElement = () => (
    <Skeleton loading={reviewLoading} avatar active className="mb-14" />
  );

  const handleAddToBasket = (id: string) => {
    insertToBasket({ reviewId: id })
      .unwrap()
      .then(() => {
        cookie.set("user_basket", [...cookie.get("user_basket"), id]);
        message.success(t("p105"));
        navigate(location.pathname);
      })
      .catch((err) => message.error(t('p31')));
  };
  return (
    <div style={width > 900 ? { width: "65%" } : { width: "100%" }}>
      <div className=" flex items-center mb-4 border-b">
        <AiFillTag />{" "}
        <h3 className="font-serif text-xl ml-2 text-gray-600">{params.id}</h3>
      </div>
      <SkeletonElement />
      <SkeletonElement />
      <SkeletonElement />
      <SkeletonElement />
      {isLoading ? <Spinner isLoading={isLoading} /> : ""}
      {data
        ? data.map((review: ReviewDetail, i: number) => (
            <ReviewCard
              includeSaveBtn={true}
              includeHead={true}
              review={review}
              key={i}
              handleAddToBasket={handleAddToBasket}
            />
          ))
        : ""}
    </div>
  );
};

export default ReviewTag;
