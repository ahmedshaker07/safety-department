import { useContext } from "react";
import { Form } from "antd";
import { injectIntl } from "react-intl";
import { Animated } from "react-animated-css";

import { login } from "../../services/auth";
import { ContextWrapper } from "../../contexts/user.context";

import ASFormItem from "../ASFormItem/ASFormItem";
import ASButton from "../ASButton/ASButton";

import "./Signin.scss";

function Signin({ intl }) {
  const { setToken } = useContext(ContextWrapper);
  async function handleSignin(values) {
    try {
      const userData = await login(values);
      localStorage.setItem("token", userData);
      setToken(userData);
    } catch (error) {
      alert(error);
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
          />
        </Form>
      </Animated>
    </div>
  );
}

export default injectIntl(Signin);
