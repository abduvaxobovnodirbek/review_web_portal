import { useTranslation } from "react-i18next";
import React, { useEffect, useState } from "react";
import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useAppDispatch } from "../../../../hooks/useAppDispatch";
import {
  toggleModal,
  toggleSocialLoginForm,
  toggleSocialRegisterForm,
} from "../../../../services/ui/modalSlice";
import { useEmailRegisterMutation } from "../../../../services/api/user/auth";
import { getCurrentUser } from "../../../../services/api/user/user";
import Spinner from "../../../../components/spinner/Spinner";


const Register: React.FC = () => {
  const dispatch = useAppDispatch();
  const [startTime, setTime] = useState(false);
  const [emailRegister, { isLoading, isError }] = useEmailRegisterMutation();
  const navigate = useNavigate();
  const cookie = new Cookies();
  const [form] = Form.useForm();
  const { t } = useTranslation();

  const onFinish = async (values: any) => {
    try {
      await emailRegister(values).unwrap();
      const { payload } = await dispatch(getCurrentUser());
      if (payload) {
        cookie.set("userId", payload._id);
        message.success(t('p100'));
        navigate("/");
      }
      form.resetFields();
      dispatch(toggleModal(false));
      dispatch(toggleSocialLoginForm(true));
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

  const backToSocialRegisterForm = (): void => {
    dispatch(toggleSocialRegisterForm(true));
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
            name="name"
            rules={[
              {
                type: "string",
                required: true,
                message: (
                  <p
                    style={{
                      fontSize: "12px",
                      fontStyle: "italic",
                      marginLeft: "5px",
                    }}
                  >
                    {t("p27")}
                  </p>
                ),
              },
            ]}
          >
            <Input placeholder={t("p27") || ""} className="ant-btn_login" />
          </Form.Item>

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
              placeholder={t("p20") || ""}
              className="ant-btn_login"
            />
          </Form.Item>

          {isError && startTime ? (
            <span className="text-red-600 italic mb-2">
              {t('p31')}
            </span>
          ) : (
            ""
          )}

          <Form.Item className="text-center">
            <Button className="ant-btn_submit w-[120px]" htmlType="submit">
            {t('p28')}
            </Button>
          </Form.Item>
        </Form>
        <span
          style={{
            color: "#03776f",
            cursor: "pointer",
            fontFamily: "sans-serif",
          }}
          onClick={backToSocialRegisterForm}
        >
          <ArrowBackIosIcon sx={{ fontSize: "15px" }} />{t('p29')}
        </span>
      </div>
    </>
  );
};

export default Register;
