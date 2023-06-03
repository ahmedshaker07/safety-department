import { injectIntl } from "react-intl";
import { Button } from "antd";
import classNames from "classnames";

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
      className={classNames("asbutton", "button", className, type)}
      type={type}
      htmlType={htmlType}
      onClick={onClick}
    >
      {label}
    </Button>
  );
}

export default injectIntl(ASButton);
