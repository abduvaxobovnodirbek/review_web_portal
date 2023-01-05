import { message, Popconfirm, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  useDeleteReviewMutation,
  useGetPersonalReviewsQuery,
} from "../../services/api/review";
import { format } from "date-fns";
import { ReviewDetail } from "../../types/api";
import useWindowSize from "../../hooks/useWindowSize";
import ReviewInfo from "../../components/review/ReviewInfo";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";

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

  const handleDelete = async (id: string) => {
    await deleteReview(id)
      .unwrap()
      .then(() => {
        message.success("Successfully deleted!");
      })
      .catch((err) => message.error("Something went wrong try again!"));
  };

  const columns: ColumnsType<ReviewDetail> = [
    {
      title: "Reviewed Art",
      width: 100,
      dataIndex: "reviewed_art",
      key: "1",
    },
    {
      title: "Review Name",
      width: 100,
      dataIndex: "review_name",
      key: "2",
    },

    {
      title: "Category",
      dataIndex: "category",
      key: "3",
      width: 100,
      render(value, record, index) {
        return <span>{record.category?.name}</span>;
      },
    },
    {
      title: "Author Grade",
      dataIndex: "authorGrade",
      key: "4",
      width: 60,
    },
    {
      title: "Likes",
      dataIndex: "likes",
      key: "5",
      width: 60,
      render(value, record, index) {
        return <span>{record.likes?.length}</span>;
      },
    },
    {
      title: "Created date",
      dataIndex: "createdAt",
      key: "6",
      width: 100,
      render(value, record, index) {
        return (
          <span>
            {format(new Date(record?.createdAt || Date.now()), "MMM do. yyyy")}
          </span>
        );
      },
    },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 50,
      render: (_: any, record: ReviewDetail) => {
        return (
          <div className="flex items-center">
            <AiFillEdit
              className="text-lg cursor-pointer"
              style={{ color: "#03776f" }}
              onClick={() => {
                setShowEditForm(true);
                setReview(record);
              }}
            />
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => handleDelete(record._id || "")}
            >
              <MdDelete className="text-lg cursor-pointer text-red-600 ml-2" />
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={reviews}
      rowKey="_id"
      scroll={{ x: 1500, y: 600 }}
      loading={isLoading || deleteReviewLoading}
      pagination={false}
      expandable={{
        expandedRowRender: (record) => (
          <div className={`${width > 500 ? "px-8" : "px-2"}`}>
            <ReviewInfo cardExist={false} width={100} review={record || ""} />
          </div>
        ),
      }}
    />
  );
};

export default ReviewsTable;
