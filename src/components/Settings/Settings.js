import { useContext, useState } from "react";
import { injectIntl } from "react-intl";
import { Form } from "antd";
import { isEmpty } from "lodash";
import { useNavigate } from "react-router-dom";

import { ContextWrapper } from "../../contexts/user.context";
import { deleteUser, editUser } from "../../services/users";
import { LayoutContextWrapper } from "../../contexts/layout.context";
import { difference } from "../../utils/helpers";

import CreateEditLayout from "../Layouts/CreateEditLayout/CreateEditLayout";
import ASButton from "../ASButton/ASButton";
import ASFormItem from "../ASFormItem/ASFormItem";
import ASConfirmationModal from "../ASConfirmationModal/ASConfirmationModal";

import "./Settings.scss";

function Settings({ intl }) {
  const { userData } = useContext(ContextWrapper);
  const { openNotification } = useContext(LayoutContextWrapper);

  const navigate = useNavigate();

  const [inEditMode, setInEditMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [form] = Form.useForm();

  const handleEnableEditMode = () => {
    setInEditMode(true);
  };

  const handleDisableEditMode = () => {
    form.resetFields();
    setInEditMode(false);
  };

  const onFinish = async (values) => {
    const payload = difference(userData, values);
    if (isEmpty(payload)) {
      handleDisableEditMode();
    } else {
      try {
        setIsLoading(true);
        await editUser(userData.id, { set: payload });
        setInEditMode(false);
      } catch (error) {
        openNotification({
          title: error.message,
          type: "error",
        });
      }
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      setIsModalOpen(false);
      await deleteUser(userData.id);
    } catch (error) {
      openNotification({
        title: error.message,
        type: "error",
      });
    }
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
      initialFormValues={userData}
      isLoading={isLoading}
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
          name="phoneNumber"
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

        {inEditMode ? (
          <ASButton
            label={intl.formatMessage({ id: "settings.change_password" })}
            onClick={() => {
              navigate("/change-password");
            }}
          />
        ) : (
          <ASButton
            label={intl.formatMessage({ id: "settings.delete_account" })}
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
          id: "common.cancel",
        })}
        confirmText={intl.formatMessage({
          id: "common.delete",
        })}
        onCancel={() => {
          setIsModalOpen(false);
        }}
        onConfirm={handleDeleteAccount}
        hasCloseIcon
      />
    </CreateEditLayout>
  );
}

export default injectIntl(Settings);
