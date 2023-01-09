import _ from "lodash";
import { Popconfirm } from "antd";
import { format } from "date-fns";
import type { ColumnsType } from "antd/es/table";
import { User } from "../../../types/api";
import { MdDelete } from "react-icons/md";
import { AiFillEdit, AiOutlineUser } from "react-icons/ai";
import { RiUserFollowFill } from "react-icons/ri";
import { ColumnUserProps } from "../../../types";
import Cloudinary from "../../../components/CloudImage/Cloudinary";
import Checkbox from "../../../components/switch/Switcher";
import { Avatar } from "@mui/material";

const ColumnData = ({
  handleDelete,
  handleShowProfile,
  setUser,
  filterData,
  users,
  handleStatus,
}: ColumnUserProps) => {
  const columns: ColumnsType<User> = [
    {
      title: "Full name",
      width: 100,
      dataIndex: "name",
      key: "1",
      filters: _.uniqWith(
        filterData(users || [])((i: User) => i?.name),
        _.isEqual
      ),
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value: string | number | boolean, record) =>
        record.name.startsWith(value as string),
    },
    {
      title: "Profile avatar",
      width: 100,
      dataIndex: "image",
      key: "2",
      render(value, record, index) {
        return (
          <>
            {record.image ? (
              <div
                className="w-[35px] h-[35px] rounded-full overflow-hidden"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <Cloudinary img={record.image} />
              </div>
            ) : (
              <Avatar sx={{ background: "#00000064" }} aria-label="recipe">
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  {record.name?.at(0)}
                </span>
              </Avatar>
            )}
          </>
        );
      },
    },
    {
      title: "Email Address",
      dataIndex: "email",
      key: "3",
      width: 100,
      render(value, record, index) {
        return <span>{record.email}</span>;
      },
      filters: _.uniqWith(
        filterData(users || [])((i: User) => i?.email),
        _.isEqual
      ),
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value: string | number | boolean, record) =>
        record.email.startsWith(value as string),
    },
    {
      title: "Followers",
      dataIndex: "followers",
      key: "4",
      width: 60,
      sorter: (a, b) =>
        (a?.followers?.length || 0) - (b?.followers?.length || 0),
      render(value, record, index) {
        return (
          <p className="flex items-center">
            {" "}
            <AiOutlineUser
              style={{ color: "#03776f", marginRight: "2px" }}
            />{" "}
            <span className="ml-1">{record.followers?.length}</span>
          </p>
        );
      },
    },
    {
      title: "Following",
      dataIndex: "following",
      key: "5",
      width: 60,
      render(value, record, index) {
        return (
          <p className="flex items-center">
            {" "}
            <RiUserFollowFill style={{ color: "#03776f" }} />{" "}
            <span className="ml-1">{record.following?.length}</span>
          </p>
        );
      },
      sorter: (a, b) =>
        (a?.following?.length || 0) - (b?.following?.length || 0),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "9",
      width: 60,
      render: (text, record) => (
        <Checkbox handleChange={() => handleStatus(record)} active={text} />
      ),
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
      render: (_: any, record: User) => {
        return (
          <div className="flex items-center">
            <AiFillEdit
              className="text-lg cursor-pointer"
              style={{ color: "#03776f" }}
              onClick={() => {
                handleShowProfile();
                setUser(record);
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
