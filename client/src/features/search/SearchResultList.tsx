import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { message, Skeleton } from "antd";
import { useTranslation } from "react-i18next";
import { CgSearchFound } from "react-icons/cg";
import Grid from "@mui/material/Grid";
import Cookies from "universal-cookie";
import Input from "../../components/searchInput/SearchInput";
import ReviewCard from "../../components/review/ReviewCard";
import useWindowSize from "../../hooks/useWindowSize";
import { useInsertToBasketMutation } from "../../services/api/user/basket";
import Spinner from "../../components/spinner/Spinner";
import { ReviewDetail } from "../../types/api";

const SearchList = ({
  data,
  reviewLoading,
}: {
  data: ReviewDetail[] | undefined;
  reviewLoading: boolean;
}) => {
  const { width } = useWindowSize();
  const [searchParams] = useSearchParams();
  const cookie = new Cookies();
  const location = useLocation();
  const navigate = useNavigate();
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
        message.success(t('p105'));
        navigate(location.pathname);
      })
      .catch((err) => message.error(t('p31')));
  };

  return (
    <div style={width > 900 ? { width: "65%" } : { width: "100%" }}>
      <Grid container spacing={2}>
        {width < 600 ? (
          <Grid item xs={12} md={12}>
            <Input />
          </Grid>
        ) : (
          ""
        )}
      </Grid>
      <div className=" flex items-center font-serif mb-4 border-b text-gray-600">
        {t("p53")}:{" "}
        <h3 className="text-xl ml-2">{searchParams.get("q") || ""}</h3>
      </div>
      <SkeletonElement />
      <SkeletonElement />
      <SkeletonElement />
      <SkeletonElement />
      {isLoading ? <Spinner isLoading={isLoading} /> : ""}
      {data && data.length ? (
        data.map((review: ReviewDetail, i: number) => (
          <ReviewCard
            includeSaveBtn={true}
            includeHead={true}
            review={review}
            key={i}
            handleAddToBasket={handleAddToBasket}
          />
        ))
      ) : (
        <div className="text-gray-600 mt-24 font-serif flex justify-center flex-col items-center">
          <CgSearchFound className="text-gray-200 text-[100px]" />
          <div className="text-center">
            <h3>{t("p51")} </h3>
            <p>{t("p52")}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchList;
