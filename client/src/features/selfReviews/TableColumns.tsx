import { Popconfirm } from "antd";
import { format } from "date-fns";
import type { ColumnsType } from "antd/es/table";
import { ReviewDetail } from "../../types/api";
import { MdDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";

const ColumnData = ({
  handleDelete,
  setShowEditForm,
  setReview,
}: {
  handleDelete: (str: string) => void;
  setShowEditForm: React.Dispatch<React.SetStateAction<boolean>>;
  setReview: React.Dispatch<React.SetStateAction<ReviewDetail | undefined>>;
}) => {
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
  return columns;
};
export default ColumnData;
