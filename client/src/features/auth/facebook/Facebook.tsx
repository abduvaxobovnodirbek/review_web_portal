import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import CustomButton from "../../../components/button/Button";
import facebookImg from "../../../assets/socialMedia/facebook.svg";
import useWindowSize from "../../../hooks/useWindowSize";
import { useAppSelector } from "../../../hooks/useAppSelector";

const Facebook = () => {
  const { showSocialRegisterForm } = useAppSelector((state) => state.authModal);
  const { width } = useWindowSize();

  const responseFacebook = (response: any) => {
    console.log(response);
  };

  return (
    <div className="mb-3">
      <FacebookLogin
        appId={process.env.REACT_APP_FACEBOOK_ID || ""}
        fields="name,email,picture"
        callback={responseFacebook}
        isMobile={width < 600 ? true : false}
        render={(renderProps) => (
          <CustomButton
            icon={facebookImg}
            text={`${
              showSocialRegisterForm ? "Register" : "Sign in"
            } with Facebook`}
            handleFunc={renderProps.onClick}
          />
        )}
      />
    </div>
  );
};

export default Facebook;
