import { useContext, useState } from "react";
import { Form } from "antd";
import { injectIntl } from "react-intl";
import { Animated } from "react-animated-css";
import { useNavigate } from "react-router-dom";

import { sendResetPasswordEmail } from "../../services/auth";
import { LayoutContextWrapper } from "../../contexts/layout.context";

import ASFormItem from "../ASFormItem/ASFormItem";
import ASButton from "../ASButton/ASButton";

import "./ForgotPassword.scss";

function ForgotPassword({ intl }) {
  const navigate = useNavigate();
  const { openNotification } = useContext(LayoutContextWrapper);

  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = async (values) => {
    try {
      setIsLoading(true);
      await sendResetPasswordEmail(values);
      openNotification({
        title: intl.formatMessage({ id: "reset_password.password_reset" }),
        type: "success",
        placement: "bottom",
      });
      setIsLoading(false);
      navigate("/signin");
    } catch (error) {
      setIsLoading(false);
      openNotification({
        title: "Something went wrong!",
        type: "error",
      });
    }
  };

  return (
    <div className="signin-page">
      <Animated animationIn="fadeInLeft" className="signin-page__modal">
        <div className="signin-page__modal-title">
          <span className="display-md">
            {intl.formatMessage({ id: "reset_password.title" })}
          </span>
          <span>{intl.formatMessage({ id: "reset_password.subtitle" })}</span>
        </div>
        <Form
          name="signin-form"
          className="signin-page__modal-form"
          layout="vertical"
          onFinish={handleResetPassword}
        >
          <ASFormItem
            name="email"
            placeholder={intl.formatMessage({ id: "signin.email" })}
            label={intl.formatMessage({ id: "signin.email" })}
            rules={[{ required: true, message: "" }]}
          />

          <ASButton
            type="primary"
            htmlType="submit"
            label={intl.formatMessage({ id: "reset_password.reset" })}
            isLoading={isLoading}
          />

          <ASButton
            type="link"
            label={intl.formatMessage({ id: "reset_password.go_back" })}
            style={{
              width: "fit-content",
              alignSelf: "end",
              marginTop: "12px",
            }}
            onClick={() => {
              navigate("/signin");
            }}
          />
        </Form>
      </Animated>
    </div>
  );
}

export default injectIntl(ForgotPassword);
