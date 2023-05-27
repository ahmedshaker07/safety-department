import { injectIntl } from "react-intl";
import { Button } from "antd";

import "./ASButton.scss";

function ASButton({
  type = "primary",
  htmlType = "",
  label = "",
  className = "",
  onClick = () => {}
}) {
  return (
    <Button
      className={className}
      type={type}
      htmlType={htmlType}
      onClick={onClick}
    >
      {label}
    </Button>
  );
}

export default injectIntl(ASButton);
