import { useTranslation } from "react-i18next";
import CustomButton from "../../../components/button/Button";
import facebookImg from "../../../assets/socialMedia/facebook.svg";
import { useAppSelector } from "../../../hooks/useAppSelector";


const Facebook = () => {
  const { showSocialRegisterForm } = useAppSelector((state) => state.authModal);
  const { t } = useTranslation();
  const signIn = () => {
    const facebookLoginURL = process.env.REACT_APP_BASE_URL + "auth/facebook";
    window.open(facebookLoginURL, "_self");
  };

  return (
    <div className="mb-3">
      <CustomButton
        icon={facebookImg}
        text={`${showSocialRegisterForm ? t("p15") : t("p10")}`}
        handleFunc={signIn}
      />
    </div>
  );
};

export default Facebook;
