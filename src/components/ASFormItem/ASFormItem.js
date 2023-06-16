import { injectIntl } from "react-intl";
import { Form, Input } from "antd";

function ASFormItem({
  label = "",
  name = "",
  rules = [],
  isPassword = false,
  placeholder,
  autoComplete,
  disabled = false,
  readOnly = false,
  hasFeedback = false,
}) {
  return (
    <Form.Item
      className="form-item"
      label={label}
      name={name}
      rules={rules}
      hasFeedback={hasFeedback}
    >
      {isPassword ? (
        <Input.Password
          autoComplete={autoComplete}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          className="input-password"
        />
      ) : (
        <Input
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
        />
      )}
    </Form.Item>
  );
}

export default injectIntl(ASFormItem);
