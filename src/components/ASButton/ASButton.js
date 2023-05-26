import { injectIntl } from "react-intl";
import { Button } from "antd";

import "./ASButton.scss";

function ASButton({ type = "primary", htmlType = "", label = "" }) {
  return (
    <Button type={type} htmlType={htmlType}>
      {label}
    </Button>
  );
}

export default injectIntl(ASButton);
