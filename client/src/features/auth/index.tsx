import { useAppSelector } from "../../hooks/useAppSelector";
import Email from "./email/Email";
import Facebook from "./facebook/Facebook";
import Google from "./google/Google";
import CustomModal from "./Modal/CustomModal";
import EmailLogin from "../auth/email/Form/Login";
import EmailRegister from "./email/Form/Register";

const Auth = () => {
  const { showEmailLoginForm, showSocialLoginForm, showEmailRegisterForm } =
    useAppSelector((state) => state.authModal);

  return (
    <CustomModal>
      {showEmailLoginForm ? (
        <EmailLogin />
      ) : showSocialLoginForm ? (
        <>
          <Google />
          <Facebook />
          <Email />
        </>
      ) : showEmailRegisterForm ? (
        <EmailRegister />
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
