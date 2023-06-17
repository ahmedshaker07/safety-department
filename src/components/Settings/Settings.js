import { useState } from "react";
import { injectIntl } from "react-intl";
import { Form } from "antd";

import CreateEditLayout from "../Layouts/CreateEditLayout/CreateEditLayout";
import ASButton from "../ASButton/ASButton";
import ASFormItem from "../ASFormItem/ASFormItem";
import ASConfirmationModal from "../ASConfirmationModal/ASConfirmationModal";

import "./Settings.scss";

function Settings({ intl }) {
  const [inEditMode, setInEditMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      className="settings-page-layout"
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
      <div className="settings-page">
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

        {!inEditMode && (
          <ASButton
            label="Delete Account"
            type="destructive-basic"
            onClick={() => {
              setIsModalOpen(true);
            }}
          />
        )}
      </div>
      <ASConfirmationModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        title={intl.formatMessage({ id: "settings.delete_account" })}
        description={intl.formatMessage({
          id: "settings.delete_account_description",
        })}
        cancelText={intl.formatMessage({
          id: "common.deactivate",
        })}
        confirmText={intl.formatMessage({
          id: "common.delete",
        })}
        onCancel={() => {
          setIsModalOpen(false);
        }}
        onConfirm={() => {
          setIsModalOpen(false);
        }}
        hasCloseIcon
      />
    </CreateEditLayout>
  );
}

export default injectIntl(Settings);
