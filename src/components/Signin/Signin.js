import { useContext, useState } from "react";
import { Form } from "antd";
import { injectIntl } from "react-intl";
import { Animated } from "react-animated-css";

import { login } from "../../services/auth";
import { ContextWrapper } from "../../contexts/user.context";
import { LayoutContextWrapper } from "../../contexts/layout.context";
import { USER_PERMISSIONS } from "../../constants/permissions";

import ASFormItem from "../ASFormItem/ASFormItem";
import ASButton from "../ASButton/ASButton";

import "./Signin.scss";

function Signin({ intl }) {
  const [isLoading, setIsLoading] = useState(false);

  const { setToken, setUserData, setPermissions } = useContext(ContextWrapper);
  const { openNotification } = useContext(LayoutContextWrapper);

  async function handleSignin(values) {
    try {
      setIsLoading(true);
      const { token, ...rest } = await login(values);
      localStorage.setItem("token", token);
      setToken(token);
      setUserData(rest);
      setPermissions(USER_PERMISSIONS[rest.role]);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      openNotification({
        title: error.message,
        type: "error",
      });
    }
  }

  return (
    <div className="signin-page">
      <Animated animationIn="fadeInLeft" className="signin-page__modal">
        <div className="signin-page__modal-title">
          <span className="display-md">
            {intl.formatMessage({ id: "signin.title" })}
          </span>
          <span>{intl.formatMessage({ id: "signin.subtitle" })}</span>
        </div>
        <Form
          name="signin-form"
          className="signin-page__modal-form"
          layout="vertical"
          onFinish={handleSignin}
        >
          <ASFormItem
            name="email"
            label={intl.formatMessage({ id: "signin.email" })}
            rules={[
              {
                required: true,
                message: "",
              },
            ]}
          />
          <ASFormItem
            name="password"
            label={intl.formatMessage({ id: "signin.password" })}
            isPassword
            rules={[
              {
                required: true,
                message: "",
              },
            ]}
          />
          <ASButton
            type="primary"
            htmlType="submit"
            label={intl.formatMessage({ id: "signin.continue" })}
            loading={isLoading}
          />
        </Form>
      </Animated>
    </div>
  );
}

export default injectIntl(Signin);
