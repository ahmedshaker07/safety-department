import { useNavigate } from "react-router-dom";
import { injectIntl } from "react-intl";
import { Form } from "antd";

import CreateEditLayout from "../../Layouts/CreateEditLayout/CreateEditLayout";

import "./AddEditDepartment.scss";

function AddEditDepartment() {
  const navigate = useNavigate();

  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  return (
    <CreateEditLayout
      form={form}
      onFinish={onFinish}
      onCancelClick={() => navigate("/departments")}
    >
      <span>Create Department Page</span>
    </CreateEditLayout>
  );
}

export default injectIntl(AddEditDepartment);
