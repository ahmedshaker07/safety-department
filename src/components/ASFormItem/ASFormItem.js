import { injectIntl } from "react-intl";
import { Form, Input } from "antd";

import "./ASFormItem.scss";

function ASFormItem({
  label = "",
  name = "",
  rules = [],
  isPassword = false,
  placeholder,
  autoComplete,
}) {
  return (
    <Form.Item
      className="form-item"
      label={label}
      name={name}
      rules={rules}
      hasFeedback
    >
      {isPassword ? (
        <Input.Password autoComplete={autoComplete} placeholder={placeholder} />
      ) : (
        <Input placeholder={placeholder} />
      )}
    </Form.Item>
  );
}

export default injectIntl(ASFormItem);
