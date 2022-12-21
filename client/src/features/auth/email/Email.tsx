import emailIcon from "../../../assets/social/email.svg";
import CustomButton from "../../../components/button/Button";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import {
  toggleEmailLoginForm,
  toggleEmailRegisterForm,
} from "../../../services/modal/modalSlice";

const Email = () => {
  const dispatch = useAppDispatch();
  const { emailLoginForm, emailRegisterForm } = useAppSelector(
    (state) => state.authModal
  );

  const openEmailLoginForm = () => dispatch(toggleEmailLoginForm(true));
  const openRegisterSocialAuth = () => dispatch(toggleEmailRegisterForm(true));

  const socialAuthLoginForm = () => {
    dispatch(toggleEmailLoginForm(false));
    dispatch(toggleEmailRegisterForm(false));
  };

  return (
    <div className="mb-4">
      <CustomButton
        handleFunc={openEmailLoginForm}
        icon={emailIcon}
        text={`${!emailRegisterForm ? 'Sign in':'Register'} with Email`}
      />
      {!emailLoginForm && !emailRegisterForm ? (
        <p className="mt-5 text-center font-serif">
          No account?{" "}
          <span
            style={{ color: "#03776f", fontWeight: "bold", cursor: "pointer" }}
            onClick={openRegisterSocialAuth}
          >
            Create one
          </span>
        </p>
      ) : emailRegisterForm ? (
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
            onClick={socialAuthLoginForm}
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
