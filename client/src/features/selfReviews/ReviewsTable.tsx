import { useTranslation } from "react-i18next";
import { message, Table } from "antd";
import { useDeleteReviewMutation } from "../../services/api/review/review";
import { ReviewDetail } from "../../types/api";
import useWindowSize from "../../hooks/useWindowSize";
import ReviewInfo from "../../components/review/ReviewInfo";
import ColumnData from "./TableColumns";

const ReviewsTable = ({
  reviews,
  isLoading,
  setShowEditForm,
  setReview,
}: {
  reviews: ReviewDetail[] | undefined;
  isLoading: boolean;
  setReview: React.Dispatch<React.SetStateAction<ReviewDetail | undefined>>;
  setShowEditForm: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [deleteReview, { isLoading: deleteReviewLoading }] =
    useDeleteReviewMutation();

  const { width } = useWindowSize();
  const { t } = useTranslation();
  const filterData = (data: ReviewDetail[]) => (formatter: any) =>
    reviews?.map((item) => ({
      text: formatter(item),
      value: formatter(item),
    }));

  const handleDelete = async (id: string) => {
    await deleteReview(id)
      .unwrap()
      .then(() => {
        message.success(t("p95"));
      })
      .catch((err) => message.error(t('p31')));
  };

  return (
    <Table
      columns={ColumnData({
        handleDelete,
        setShowEditForm,
        setReview,
        filterData,
        reviews,
      })}
      dataSource={reviews}
      rowKey="_id"
      scroll={{ x: 1500, y: 600 }}
      loading={isLoading || deleteReviewLoading}
      rowClassName={"dark:!bg-zinc-800 dark:[&>*]:!bg-zinc-800 dark:text-white"}
      pagination={false}
      expandable={{
        expandedRowRender: (record) => (
          <div className={`${width > 500 ? "px-8" : "px-2"} dark:bg-zinc-800`}>
            <ReviewInfo
              reviewActionExist={false}
              cardExist={false}
              width={100}
              review={record || ""}
            />
          </div>
        ),
      }}
    />
  );
};

export default ReviewsTable;
