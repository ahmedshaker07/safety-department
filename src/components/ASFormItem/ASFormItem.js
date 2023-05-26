import { injectIntl } from "react-intl";
import { Form, Input } from "antd";

import "./ASFormItem.scss";

function ASFormItem({ label = "", name = "", rules = [], isPassword = false }) {
  return (
    <Form.Item className="form-item" label={label} name={name} rules={rules}>
      {isPassword ? <Input.Password /> : <Input />}
    </Form.Item>
  );
}

export default injectIntl(ASFormItem);
