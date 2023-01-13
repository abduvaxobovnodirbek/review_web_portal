import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Form, Input, message } from "antd";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useAppDispatch } from "../../../../hooks/useAppDispatch";
import {
  toggleSocialLoginForm,
  toggleModal,
} from "../../../../services/ui/modalSlice";
import { useEmailLoginMutation } from "../../../../services/api/user/auth";
import { getCurrentUser } from "../../../../services/api/user/user";
import Spinner from "../../../../components/spinner/Spinner";

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const [startTime, setTime] = useState(false);
  const [emailLogin, { isLoading, isError }] = useEmailLoginMutation();
  const navigate = useNavigate();
  const cookie = new Cookies();
  const [form] = Form.useForm();
  const { t } = useTranslation();

  const onFinish = async (values: any) => {
    try {
      await emailLogin(values).unwrap();
      const { payload } = await dispatch(getCurrentUser());
      if (payload) {
        cookie.set("userId", payload._id);
        if (payload.role === "super_admin") {
          cookie.set("role", payload.role);
        }
        message.success(t("p99"));
        navigate("/");
      }
      form.resetFields();
      backToSocialLoginForm();
      dispatch(toggleModal(false));
    } catch (error) {
      setTime(true);
    }
  };

  useEffect(() => {
    if (startTime) {
      setTimeout(() => {
        setTime(false);
      }, 3000);
    }
  }, [startTime]);

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const backToSocialLoginForm = (): void => {
    dispatch(toggleSocialLoginForm(true));
  };

  return (
    <>
      {isLoading ? <Spinner isLoading={isLoading} /> : ""}

      <div className="flex flex-col items-center">
        <Form
          name="basic"
          wrapperCol={{ span: 24 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                message: (
                  <p style={{ fontSize: "12px", fontStyle: "italic" }}>
                    {t("p25")}
                  </p>
                ),
              },
              {
                required: true,
                message: (
                  <p
                    style={{
                      fontSize: "12px",
                      fontStyle: "italic",
                      marginLeft: "5px",
                    }}
                  >
                    {t("p21")}
                  </p>
                ),
              },
            ]}
          >
            <Input
              type="email"
              placeholder={t("p19") || ""}
              className="ant-btn_login"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: (
                  <p
                    style={{
                      fontSize: "12px",
                      fontStyle: "italic",
                      marginLeft: "5px",
                    }}
                  >
                    {t("p22")}
                  </p>
                ),
              },
            ]}
          >
            <Input.Password
              placeholder="enter password"
              className="ant-btn_login"
            />
          </Form.Item>
          {isError && startTime ? (
            <span className="text-red-600 italic mb-2">{t("p30")}</span>
          ) : (
            ""
          )}

          <Form.Item className="text-center">
            <Button className="ant-btn_submit w-[120px]" htmlType="submit">
              {t("p23")}
            </Button>
          </Form.Item>
        </Form>
        <span
          style={{
            color: "#03776f",
            cursor: "pointer",
            fontFamily: "sans-serif",
          }}
          onClick={backToSocialLoginForm}
        >
          <ArrowBackIosIcon sx={{ fontSize: "15px" }} /> {t("p24")}
        </span>
      </div>
    </>
  );
};

export default Login;
