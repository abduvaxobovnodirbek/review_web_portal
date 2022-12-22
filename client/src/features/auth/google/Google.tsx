import { useEffect } from "react";
import { useGoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import googleImg from "../../../assets/social/googleImg.svg";
import CustomButton from "../../../components/button/Button";
import { useAppSelector } from "../../../hooks/useAppSelector";

const clientId = process.env.REACT_APP_CLIENT_ID || "";

const GoogleLogin = () => {
  const { showSocialRegisterForm } = useAppSelector((state) => state.authModal);

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId,
        scope: "email",
      });
    }

    gapi.load("client:auth2", start);
  }, []);

  const onSuccess = async (res: any) => {
    console.log("Google Login Name", res);
  };

  const onFailure = (res: any) => {
    console.log("Login failed: res:", res);
  };
  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
  });

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
