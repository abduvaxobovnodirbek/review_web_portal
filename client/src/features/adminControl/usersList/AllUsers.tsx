import { Box } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useGetAllUsersQuery } from "../../../services/api/admin/admin";
import { toggleProfileModal } from "../../../services/ui/modalSlice";
import { User } from "../../../types/api";
import ProfileModal from "../../profile/ProfileModal";
import UsersTable from "./UsersTable";

const AllUsers = () => {
  const { data: users, isLoading } = useGetAllUsersQuery();
  const [user, setUser] = useState<User | undefined>(undefined);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  
  const handleShowProfile = () => {
    dispatch(toggleProfileModal(true));
  };

  return (
    <Box sx={{ width: "100%" }}>
      <h3
        className="text-center text-xl font-serif text-white  shadow-md p-3 mb-8"
        style={{ background: "#03776f" }}
      >
        {t("p87")}
      </h3>
      <UsersTable
        users={users}
        isLoading={isLoading}
        setUser={setUser}
        handleShowProfile={handleShowProfile}
      />
      <ProfileModal user={user} />
    </Box>
  );
};

export default AllUsers;
