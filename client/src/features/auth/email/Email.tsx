import emailIcon from "../../../assets/social/email.svg";
import CustomButton from "../../../components/button/Button";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import {
  toggleSocialRegisterForm,
  toggleEmailLoginForm,
  toggleSocialLoginForm,
  toggleEmailRegisterForm,
} from "../../../services/modal/modalSlice";

const Email = () => {
  const dispatch = useAppDispatch();
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
        text={`${showSocialRegisterForm ? "Register" : "Sign in"} with Email`}
      />

      {showSocialLoginForm ? (
        <p className="mt-5 text-center font-serif">
          No account?{" "}
          <span
            style={{ color: "#03776f", fontWeight: "bold", cursor: "pointer" }}
            onClick={openRegisterSocialForm}
          >
            Create one
          </span>
        </p>
      ) : showSocialRegisterForm ? (
        <>
          <p className="mt-5 text-center font-serif">
            Already have an account?
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
            Sign In
          </p>
        </>
      ) : (
        ""
      )}
    </div>
  );
};
export default Email;
