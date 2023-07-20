import { injectIntl } from "react-intl";
import { Button } from "antd";
import classNames from "classnames";

import "./ASButton.scss";

function ASButton({
  type = "primary",
  htmlType,
  label = "",
  className = "",
  onClick = () => {},
  isLoading = false,
  ...rest
}) {
  return (
    <Button
      className={classNames("asbutton", "button", className, type)}
      type={type}
      htmlType={htmlType}
      onClick={onClick}
      loading={isLoading}
      {...rest}
    >
      {label}
    </Button>
  );
}

export default injectIntl(ASButton);
