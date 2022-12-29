import CustomButton from "../../../components/button/Button";
import facebookImg from "../../../assets/socialMedia/facebook.svg";
import { useAppSelector } from "../../../hooks/useAppSelector";

const Facebook = () => {
  const { showSocialRegisterForm } = useAppSelector((state) => state.authModal);

  const signIn = () => {
    const facebookLoginURL = process.env.REACT_APP_BASE_URL + "auth/facebook";
    window.open(facebookLoginURL, "_self");
  };

  return (
    <div className="mb-3">
      <CustomButton
        icon={facebookImg}
        text={`${
          showSocialRegisterForm ? "Register" : "Sign in"
        } with Facebook`}
        handleFunc={signIn}
      />
    </div>
  );
};

export default Facebook;
