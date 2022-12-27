import { useGoogleLogin } from "react-google-login";
import googleImg from "../../../assets/socialMedia/googleImg.svg";
import CustomButton from "../../../components/button/Button";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { useEffect } from "react";
import { gapi } from "gapi-script";

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
  });
  const onSuccess = async (response: any) => {
    console.log(response, "success");
  };

  const onFailure = (response: any) => {
    console.log(response, "failed");
  };

  const { signIn } = useGoogleLogin({
    onSuccess,
    clientId,
    cookiePolicy: "single_host_origin",
    onFailure,
    isSignedIn: false,
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
