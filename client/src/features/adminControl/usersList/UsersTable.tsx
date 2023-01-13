import { message, Table } from "antd";
import { useTranslation } from "react-i18next";
import useWindowSize from "../../../hooks/useWindowSize";
import {
  useChangeUserStatusMutation,
  useDeleteUserMutation,
} from "../../../services/api/admin/admin";
import { panelProps } from "../../../types";
import { User } from "../../../types/api";
import ColumnData from "./TableColumns";

const UsersTable = ({
  users,
  isLoading,
  handleShowProfile,
  setUser,
}: panelProps) => {
  const { width } = useWindowSize();
  const [deleteUser, { isLoading: deleteUserLoading }] =
    useDeleteUserMutation();
  const [changeStatus, { isLoading: changeStatusLoader }] =
    useChangeUserStatusMutation();
  const {t} = useTranslation()  

  const filterData = (data: User[]) => (formatter: any) =>
    users?.map((item) => ({
      text: formatter(item),
      value: formatter(item),
    }));

  const handleDelete = async (id: string) => {
    await deleteUser(id)
      .unwrap()
      .then(() => {
        message.success(t("p95"));
      })
      .catch(() => message.error(t('p31')));
  };

  const handleStatus = async (user: User) => {
    await changeStatus({ status: !user.status, id: user._id })
      .unwrap()
      .then(() => {
        message.success(t('p98'));
      })
      .catch(() => message.error(t('p31')));
  };

  return (
    <>
      <Table
        columns={ColumnData({
          handleDelete,
          handleShowProfile,
          setUser,
          filterData,
          users,
          handleStatus,
        })}
        dataSource={users}
        rowKey="_id"
        scroll={{ x: 1500, y: 600 }}
        loading={isLoading || deleteUserLoading || changeStatusLoader}
        pagination={false}
        rowClassName={
          "dark:!bg-zinc-800 dark:[&>*]:!bg-zinc-800 dark:text-white"
        }
        expandable={{
          expandedRowRender: (record) => (
            <div
              className={`${width > 500 ? "px-8" : "px-2"} dark:bg-zinc-800`}
            >
              <div className="flex items-center text-gray-600 dark:text-white">
                <h3>Bio of {record.name}:</h3>
                <h3 className="ml-2 font-bold italic">{record.userInfo}</h3>
              </div>
            </div>
          ),
        }}
      />
    </>
  );
};

export default UsersTable;
