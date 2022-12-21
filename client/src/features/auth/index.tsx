import { useAppSelector } from "../../hooks/useAppSelector";
import Email from "./email/Email";
import Facebook from "./facebook/Facebook";
import Google from "./google/Google";
import CustomModal from "./Modal/CustomModal";
import EmailLogin from "../auth/email/Form/Login";
const Auth = () => {
  const { emailLoginForm, emailRegisterForm } = useAppSelector(
    (state) => state.authModal
  );

  return (
    <CustomModal>
      {emailLoginForm ? (
        <EmailLogin />
      ) : emailRegisterForm ? (
        <>
          <Google />
          <Facebook />
          <Email />
        </>
      ) : (
        <>
          <Google />
          <Facebook />
          <Email />
        </>
      )}
    </CustomModal>
  );
};

export default Auth;
