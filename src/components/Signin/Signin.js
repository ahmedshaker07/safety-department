import { Form } from "antd";
import { injectIntl } from "react-intl";
import { Animated } from "react-animated-css";

import ASFormItem from "../ASFormItem/ASFormItem";
import ASButton from "../ASButton/ASButton";

import "./Signin.scss";

function Signin({ intl }) {
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
        >
          <ASFormItem
            name="email"
            label={intl.formatMessage({ id: "signin.email" })}
            rules={[
              {
                required: true,
                message: ""
              }
            ]}
          />
          <ASFormItem
            name="password"
            label={intl.formatMessage({ id: "signin.password" })}
            isPassword
            rules={[
              {
                required: true,
                message: ""
              }
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
