import _ from "lodash";
import { Popconfirm } from "antd";
import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded";
import { format } from "date-fns";
import type { ColumnsType } from "antd/es/table";
import { ReviewDetail } from "../../types/api";
import { MdDelete } from "react-icons/md";
import { AiFillEdit, AiFillStar } from "react-icons/ai";
import { ColumnProps } from "../../types";

const ColumnData = ({
  handleDelete,
  setShowEditForm,
  setReview,
  filterData,
  reviews,
}: ColumnProps) => {
  const columns: ColumnsType<ReviewDetail> = [
    {
      title: "Reviewed Art",
      width: 100,
      dataIndex: "reviewed_art",
      key: "1",
      filters: _.uniqWith(
        filterData(reviews || [])((i: ReviewDetail) => i?.reviewed_art),
        _.isEqual
      ),
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value: string | number | boolean, record) =>
        record.reviewed_art.startsWith(value as string),
    },
    {
      title: "Review Name",
      width: 100,
      dataIndex: "review_name",
      key: "2",
      filters: _.uniqWith(
        filterData(reviews || [])((i: ReviewDetail) => i?.review_name),
        _.isEqual
      ),
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value: string | number | boolean, record) =>
        record.review_name.startsWith(value as string),
    },

    {
      title: "Category",
      dataIndex: "category",
      key: "3",
      width: 100,
      render(value, record, index) {
        return <span>{record.category?.name}</span>;
      },
      filters: _.uniqWith(
        filterData(reviews || [])((i: ReviewDetail) => i?.category.name),
        _.isEqual
      ),
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value: string | number | boolean, record) =>
        record.category.name.startsWith(value as string),
    },
    {
      title: "Author Grade",
      dataIndex: "authorGrade",
      key: "4",
      width: 60,
      sorter: (a, b) => a.authorGrade - b.authorGrade,
      render(value, record, index) {
        return (
          <span className="flex items-center">
            {" "}
            <AiFillStar style={{ color: "#03776f", marginRight: "2px" }} />{" "}
            {record.likeCount}
          </span>
        );
      },
    },
    {
      title: "Likes",
      dataIndex: "likes",
      key: "5",
      width: 60,
      render(value, record, index) {
        return (
          <span>
            {" "}
            <ThumbUpRoundedIcon sx={{ color: "#03776f" }} />{" "}
            {record.likes?.length}
          </span>
        );
      },
      sorter: (a, b) => a.likeCount - b.likeCount,
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
      sorter: (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
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
