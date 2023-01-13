import { MdBookmarkRemove } from "react-icons/md";
import { message, Skeleton } from "antd";
import Cookies from "universal-cookie";
import { useTranslation } from "react-i18next";
import {
  useGetBasketQuery,
  useRemoveFromBasketMutation,
} from "../../../services/api/user/basket";
import { ReviewDetail } from "../../../types/api";
import ReviewCard from "../../../components/review/ReviewCard";
import ContextWrapper from "../../../layouts/ContextWrapper";
import Spinner from "../../../components/spinner/Spinner";

const SavedReviews = () => {
  const cookie = new Cookies();
  const { t } = useTranslation();
  const [removeFromBasket, { isLoading: remove_basket_loading }] =
    useRemoveFromBasketMutation();

  const { data, isLoading: get_reviews_loading } = useGetBasketQuery();

  const handleClear = async (id: string) => {
    const newCookie = [...cookie.get("user_basket")].filter(
      (_id) => _id !== id
    );
    await removeFromBasket(id)
      .unwrap()
      .then(() => {
        cookie.set("user_basket", newCookie);
        message.success(t("p110"));
      })
      .catch((err) => {
        message.error(t("p31"));
      });
  };

  return (
    <div className="dark:min-h-screen">
      <ContextWrapper flexOptions={"justify-center w-[90%] max-w-[800px]"}>
        <div className="mx-4  w-[100%]">
          {remove_basket_loading ? (
            <Spinner isLoading={remove_basket_loading} />
          ) : (
            ""
          )}

          {get_reviews_loading ? (
            <>
              {" "}
              <Skeleton active className="mb-8" />
              <Skeleton active className="mb-8" />
              <Skeleton active className="mb-8" />
            </>
          ) : (
            ""
          )}
          {data?.map((review: ReviewDetail, i: number) => {
            return (
              <div className="border-b flex flex-col items-end mb-3" key={i}>
                <MdBookmarkRemove
                  className="cursor-pointer text-2xl text-gray-600"
                  onClick={() => handleClear(review._id || "")}
                />
                <ReviewCard
                  includeHead={false}
                  includeSaveBtn={false}
                  review={review}
                />
              </div>
            );
          })}

          {!data?.length && !get_reviews_loading ? (
            <h3 className="text-center text-xl font-serif text-gray-600 dark:text-white dark:shadow-gray-300 shadow-md p-3">
              {t("p73")}
            </h3>
          ) : (
            ""
          )}
        </div>
      </ContextWrapper>
    </div>
  );
};

export default SavedReviews;
