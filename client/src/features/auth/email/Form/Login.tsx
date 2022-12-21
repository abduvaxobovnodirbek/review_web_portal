import React from "react";
import { Button, Form, Input } from "antd";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useAppDispatch } from "../../../../hooks/useAppDispatch";
import { toggleEmailLoginForm } from "../../../../services/modal/modalSlice";

const Login: React.FC = () => {
  const dispatch = useAppDispatch();

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const backToSignInOptions = (): void => {
    dispatch(toggleEmailLoginForm(false));
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
            Submit
          </Button>
        </Form.Item>
      </Form>
      <span
        style={{
          color: "#03776f",
          cursor: "pointer",
          fontFamily: "sans-serif",
        }}
        onClick={backToSignInOptions}
      >
        <ArrowBackIosIcon sx={{ fontSize: "15px" }} /> All sign in options
      </span>
    </div>
  );
};

export default Login;
