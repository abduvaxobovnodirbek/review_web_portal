import { IconButton } from "@mui/material";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { openModal } from "../../../services/modal/modalSlice";

const SignIn = () => {
  const dispatch = useAppDispatch();
  const handleClickOpen = (): void => {
    dispatch(openModal());
  };
  return (
    <IconButton size="small" aria-label="sign in" onClick={handleClickOpen}>
      <p className="text-black text-sm font-medium">Sign In</p>
    </IconButton>
  );
};

export default SignIn;
