import { Button, Form } from "antd";
import { injectIntl } from "react-intl";
import { Animated } from "react-animated-css";

import FormItem from "../FormItem/FormItem";

import "./Signin.scss";

function Signin() {
  return (
    <div className="signin-page">
      <Animated
        animationIn="bounceInLeft"
        animationOut="fadeOut"
        isVisible={true}
        className="signin-page__modal"
      >
        <div className="signin-page__modal-title">
          <span>Sign in</span>
          <span>Enter your credentials to signin to your account</span>
        </div>
        <Form
          name="signin-form"
          className="signin-page__modal-form"
          layout="vertical"
        >
          <FormItem
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: ""
              }
            ]}
          />
          <FormItem
            name="password"
            label="Password"
            isPassword
            rules={[
              {
                required: true,
                message: ""
              }
            ]}
          />
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form>
      </Animated>

      {/* <div className="signin-page__modal">
        <div className="signin-page__modal-title">
          <span>Sign in</span>
          <span>Enter your credentials to signin to your account</span>
        </div>
        <Form
          name="signin-form"
          className="signin-page__modal-form"
          layout="vertical"
        >
          <FormItem
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: ""
              }
            ]}
          />
          <FormItem
            name="password"
            label="Password"
            isPassword
            rules={[
              {
                required: true,
                message: ""
              }
            ]}
          />
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form>
      </div> */}
    </div>
  );
}

export default injectIntl(Signin);
