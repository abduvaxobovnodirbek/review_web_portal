import googleImg from "../../../assets/socialMedia/googleImg.svg";
import CustomButton from "../../../components/button/Button";
import { useAppSelector } from "../../../hooks/useAppSelector";

const GoogleLogin = () => {
  const { showSocialRegisterForm } = useAppSelector((state) => state.authModal);

  const signIn = () => {
    const googleLoginURL = process.env.REACT_APP_BASE_URL + "auth/google";
    window.open(googleLoginURL, "_self");
  };

  return (
    <div className="mb-4">
      <CustomButton
        handleFunc={signIn}
        icon={googleImg}
        text={`${showSocialRegisterForm ? "Register" : "Sign in"} with Google`}
      />
    </div>
  );
};
export default GoogleLogin;
