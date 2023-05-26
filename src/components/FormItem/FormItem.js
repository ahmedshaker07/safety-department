import { injectIntl } from "react-intl";
import { Form, Input } from "antd";

function FormItem({ label = "", name = "", rules = [], isPassword = false }) {
  return (
    <Form.Item label={label} name={name} rules={rules}>
      {isPassword ? <Input.Password /> : <Input />}
    </Form.Item>
  );
}

export default injectIntl(FormItem);
