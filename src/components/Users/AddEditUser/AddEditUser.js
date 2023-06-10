import { useNavigate } from "react-router-dom";
import { injectIntl } from "react-intl";
import { Form } from "antd";

import CreateEditLayout from "../../Layouts/CreateEditLayout/CreateEditLayout";

import "./AddEditUser.scss";

function AddEditUser() {
  const navigate = useNavigate();

  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  return (
    <CreateEditLayout
      form={form}
      onFinish={onFinish}
      onCancelClick={() => navigate("/users")}
    >
      <span>Create User Page</span>
    </CreateEditLayout>
  );
}

export default injectIntl(AddEditUser);
