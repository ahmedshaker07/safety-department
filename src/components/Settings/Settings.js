import { useState } from "react";
import { injectIntl } from "react-intl";
import { Form } from "antd";

import CreateEditLayout from "../Layouts/CreateEditLayout/CreateEditLayout";
import ASButton from "../ASButton/ASButton";
import ASFormItem from "../ASFormItem/ASFormItem";

function Settings({ intl }) {
  const [inEditMode, setInEditMode] = useState(false);
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log(values);
    setInEditMode(false);
  };

  const handleEnableEditMode = () => {
    setInEditMode(true);
  };

  const handleDisableEditMode = () => {
    form.resetFields();
    setInEditMode(false);
  };

  return (
    <CreateEditLayout
      form={form}
      onFinish={onFinish}
      onCancelClick={handleDisableEditMode}
      actions={
        !inEditMode && (
          <ASButton
            label={intl.formatMessage({ id: "common.edit" })}
            onClick={handleEnableEditMode}
          />
        )
      }
      initialFormValues={{
        fullName: "Sherif Mohamed",
        email: "ecpcadmin@ecpc.com",
        password: "12345",
        phone: "01030220179",
      }}
    >
      <div>
        <ASFormItem
          name="fullName"
          disabled={!inEditMode}
          label={intl.formatMessage({ id: "users.full_name" })}
          placeholder={intl.formatMessage({ id: "users.full_name" })}
          rules={[{ required: true, message: "" }]}
        />
        <ASFormItem
          name="phone"
          disabled={!inEditMode}
          placeholder={intl.formatMessage({ id: "users.phone" })}
          label={intl.formatMessage({ id: "users.phone" })}
          rules={[{ required: true, message: "" }]}
        />
        <ASFormItem
          name="email"
          disabled={!inEditMode}
          placeholder={intl.formatMessage({ id: "signin.email" })}
          label={intl.formatMessage({ id: "signin.email" })}
          rules={[{ required: true, message: "" }]}
        />
        <ASFormItem
          name="password"
          isPassword
          disabled={!inEditMode}
          placeholder={intl.formatMessage({ id: "signin.password" })}
          label={intl.formatMessage({ id: "signin.password" })}
          rules={[{ required: true, message: "" }]}
          autoComplete="new-password"
        />
      </div>
    </CreateEditLayout>
  );
}

export default injectIntl(Settings);
