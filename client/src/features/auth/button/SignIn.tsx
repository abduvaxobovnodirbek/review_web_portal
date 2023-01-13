import { IconButton } from "@mui/material";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { toggleModal } from "../../../services/ui/modalSlice";
import { useTranslation } from "react-i18next";

const SignIn = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const handleClickOpen = (): void => {
    dispatch(toggleModal(true));
  };
  return (
    <IconButton size="small" aria-label="sign in" onClick={handleClickOpen}>
      <p className="text-black text-sm font-medium dark:text-white">
        {t("p7")}
      </p>
    </IconButton>
  );
};

export default SignIn;
