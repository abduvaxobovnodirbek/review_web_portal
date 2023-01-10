import { message, Table } from "antd";
import { useDeleteReviewMutation } from "../../../services/api/review/review";
import { ReviewDetail } from "../../../types/api";
import useWindowSize from "../../../hooks/useWindowSize";
import ReviewInfo from "../../../components/review/ReviewInfo";
import ColumnData from "./TableColumns";
import { adminControlApi } from "../../../services/api/admin/admin";
import { useAppDispatch } from "../../../hooks/useAppDispatch";

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
  const dispatch = useAppDispatch();

  const filterData = (data: ReviewDetail[]) => (formatter: any) =>
    reviews?.map((item) => ({
      text: formatter(item),
      value: formatter(item),
    }));

  const handleDelete = async (id: string) => {
    await deleteReview(id)
      .unwrap()
      .then(() => {
        dispatch(
          adminControlApi.util.invalidateTags([{ type: "Reviews", id: "LIST" }])
        );
        message.success("Successfully deleted!");
      })
      .catch((err) => message.error("Something went wrong try again!"));
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
      pagination={false}
      rowClassName={"dark:!bg-zinc-800 dark:[&>*]:!bg-zinc-800 dark:text-white"}
      expandable={{
        expandedRowRender: (record) => (
          <div
            className={`${
              width > 500 ? "px-8" : "px-2"
            } dark:bg-zinc-800 dark:text-white`}
          >
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