import { useTranslation } from "react-i18next";
import emailIcon from "../../../assets/socialMedia/email.svg";
import CustomButton from "../../../components/button/Button";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import {
  toggleSocialRegisterForm,
  toggleEmailLoginForm,
  toggleSocialLoginForm,
  toggleEmailRegisterForm,
} from "../../../services/ui/modalSlice";

const Email = () => {
  const dispatch = useAppDispatch();
  const {t} = useTranslation()
  const { showSocialRegisterForm, showSocialLoginForm } = useAppSelector(
    (state) => state.authModal
  );

  const openEmailLoginForm = () => dispatch(toggleEmailLoginForm(true));
  const openRegisterSocialForm = () => dispatch(toggleSocialRegisterForm(true));
  const openLoginSocialForm = () => dispatch(toggleSocialLoginForm(true));
  const openEmailRegisterForm = () => dispatch(toggleEmailRegisterForm(true));

  return (
    <div className="mb-4">
      <CustomButton
        handleFunc={() => {
          if (showSocialLoginForm) {
            return openEmailLoginForm();
          } else {
            openEmailRegisterForm();
          }
        }}
        icon={emailIcon}
        text={`${showSocialRegisterForm ? t("p26") : t("p11")}`}
      />

      {showSocialLoginForm ? (
        <p className="mt-5 text-center font-serif">
          {t("p12")}{" "}
          <span
            style={{ color: "#03776f", fontWeight: "bold", cursor: "pointer" }}
            onClick={openRegisterSocialForm}
          >
            {t("p13")}
          </span>
        </p>
      ) : showSocialRegisterForm ? (
        <>
          <p className="mt-5 text-center font-serif">
          {t("p17")}
          </p>
          <p
            style={{
              color: "#03776f",
              fontWeight: "bold",
              cursor: "pointer",
              textAlign: "center",
            }}
            onClick={openLoginSocialForm}
          >
            {t("p7")}
          </p>
        </>
      ) : (
        ""
      )}
    </div>
  );
};
export default Email;
