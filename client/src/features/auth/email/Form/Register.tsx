import React from "react";
import { Button, Form, Input } from "antd";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useAppDispatch } from "../../../../hooks/useAppDispatch";
import { toggleSocialRegisterForm } from "../../../../services/modal/modalSlice";
import axios from "axios";

const Register: React.FC = () => {
  const dispatch = useAppDispatch();

  const onFinish = async (values: any) => {
    console.log("Success:", values);
    axios
      .post("http://localhost:5000/api/v1/auth/email_register", values)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const backToSocialRegisterForm = (): void => {
    dispatch(toggleSocialRegisterForm(true));
  };

  return (
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
  );
};

export default Register;
