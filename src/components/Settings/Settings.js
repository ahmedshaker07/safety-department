import { useContext, useState } from "react";
import { injectIntl } from "react-intl";
import { Form } from "antd";
import { isEmpty } from "lodash";
import { useNavigate } from "react-router-dom";

import { ContextWrapper } from "../../contexts/user.context";
import { editUser } from "../../services/users";
import { LayoutContextWrapper } from "../../contexts/layout.context";
import { difference } from "../../utils/helpers";

import CreateEditLayout from "../Layouts/CreateEditLayout/CreateEditLayout";
import ASButton from "../ASButton/ASButton";
import ASFormItem from "../ASFormItem/ASFormItem";

import "./Settings.scss";

function Settings({ intl }) {
  const { userData } = useContext(ContextWrapper);
  const { openNotification } = useContext(LayoutContextWrapper);

  const navigate = useNavigate();

  const [inEditMode, setInEditMode] = useState(false);
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

        {inEditMode && (
          <ASButton
            label={intl.formatMessage({ id: "settings.change_password" })}
            onClick={() => {
              navigate("/change-password");
            }}
          />
        )}
      </div>
    </CreateEditLayout>
  );
}

export default injectIntl(Settings);
