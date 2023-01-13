import _ from "lodash";
import { Popconfirm } from "antd";
import { format } from "date-fns";
import { Avatar } from "@mui/material";
import { useTranslation } from "react-i18next";
import type { ColumnsType } from "antd/es/table";
import { MdDelete } from "react-icons/md";
import { AiFillEdit, AiOutlineUser } from "react-icons/ai";
import { RiUserFollowFill } from "react-icons/ri";
import { User } from "../../../types/api";
import { ColumnUserProps } from "../../../types";
import Cloudinary from "../../../components/CloudImage/Cloudinary";
import Checkbox from "../../../components/switch/Switcher";

const ColumnData = ({
  handleDelete,
  handleShowProfile,
  setUser,
  filterData,
  users,
  handleStatus,
}: ColumnUserProps) => {
  const { t } = useTranslation();
  const columns: ColumnsType<User> = [
    {
      title: t("p89"),
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
      title: t("p90"),
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
      title: t("p91"),
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
      title: t("p50"),
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
      title: t("p33"),
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
      title: t("p92"),
      dataIndex: "status",
      key: "9",
      width: 60,
      render: (text, record) => (
        <Checkbox handleChange={() => handleStatus(record)} active={text} />
      ),
    },
    {
      title: t("p81"),
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
      title: t("p82"),
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
              title={t("p84") || ""}
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
