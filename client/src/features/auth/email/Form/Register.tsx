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

  const onFinish = async (values: any) => {
    try {
      await emailRegister(values).unwrap();
      const { payload } = await dispatch(getCurrentUser());
      if (payload) {
        cookie.set("userId", payload._id);
        message.success("Successfully registered !");
        navigate("/");
      }
      form.resetFields();
      dispatch(toggleModal(false));
      dispatch(toggleSocialLoginForm(true));
    } catch (error) {
      console.log(error);
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
                    Please input your full name!
                  </p>
                ),
              },
            ]}
          >
            <Input placeholder="enter full name" className="ant-btn_login" />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                message: (
                  <p style={{ fontSize: "12px", fontStyle: "italic" }}>
                    The input is not valid E-mail!
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
                    Please input your E-mail!
                  </p>
                ),
              },
            ]}
          >
            <Input
              type="email"
              placeholder="enter email address"
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
                    Please input your password!
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
            <span className="text-red-600 italic mb-2">
              Something went wrong try again !
            </span>
          ) : (
            ""
          )}

          <Form.Item className="text-center">
            <Button className="ant-btn_submit w-[120px]" htmlType="submit">
              Register
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
          <ArrowBackIosIcon sx={{ fontSize: "15px" }} /> All register options
        </span>
      </div>
    </>
  );
};

export default Register;
