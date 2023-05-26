import { Button, Form } from "antd";
import { injectIntl } from "react-intl";
import { Animated } from "react-animated-css";

import FormItem from "../FormItem/FormItem";

import "./Signin.scss";

function Signin({ intl }) {
  return (
    <div className="signin-page">
      <Animated animationIn="fadeInLeft" className="signin-page__modal">
        <div className="signin-page__modal-title">
          <span>{intl.formatMessage({ id: "signin.title" })}</span>
          <span>{intl.formatMessage({ id: "signin.subtitle" })}</span>
        </div>
        <Form
          name="signin-form"
          className="signin-page__modal-form"
          layout="vertical"
        >
          <FormItem
            name="email"
            label={intl.formatMessage({ id: "signin.email" })}
            rules={[
              {
                required: true,
                message: ""
              }
            ]}
          />
          <FormItem
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
          <Button type="primary" htmlType="submit">
            {intl.formatMessage({ id: "signin.continue" })}
          </Button>
        </Form>
      </Animated>
    </div>
  );
}

export default injectIntl(Signin);
