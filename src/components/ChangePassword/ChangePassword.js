import { useContext, useState } from "react";
import { injectIntl } from "react-intl";
import { Form } from "antd";

import { changePassword } from "../../services/users";
import { LayoutContextWrapper } from "../../contexts/layout.context";

import CreateEditLayout from "../Layouts/CreateEditLayout/CreateEditLayout";
import ASFormItem from "../ASFormItem/ASFormItem";

function ChangePassword({ intl }) {
  const { openNotification } = useContext(LayoutContextWrapper);

  const [isLoading, setIsLoading] = useState(false);

  const [form] = Form.useForm();
  const oldPassword = Form.useWatch("oldPassword", form);
  const newPassword = Form.useWatch("newPassword", form);

  const onFinish = async (values) => {
    try {
      setIsLoading(true);
      await changePassword(values);
      form.resetFields();
      openNotification({
        title: "Password changed successfully.",
      });
    } catch (error) {
      openNotification({
        title: error.message,
        type: "error",
      });
    }
    setIsLoading(false);
  };

  return (
    <CreateEditLayout
      form={form}
      className="settings-page-layout"
      onFinish={onFinish}
      isLoading={isLoading}
      hideCancel
      isSaveDisabled={!oldPassword || !newPassword}
    >
      <div className="settings-page">
        <ASFormItem
          name="oldPassword"
          isPassword
          placeholder={intl.formatMessage({ id: "settings.old_password" })}
          label={intl.formatMessage({ id: "settings.old_password" })}
          rules={[{ required: true, message: "" }]}
          autoComplete="new-password"
        />
        <ASFormItem
          name="newPassword"
          isPassword
          placeholder={intl.formatMessage({ id: "settings.new_password" })}
          label={intl.formatMessage({ id: "settings.new_password" })}
          rules={[{ required: true, message: "" }]}
          autoComplete="new-password"
        />
      </div>
    </CreateEditLayout>
  );
}

export default injectIntl(ChangePassword);
