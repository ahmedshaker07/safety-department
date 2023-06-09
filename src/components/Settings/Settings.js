import { injectIntl } from "react-intl";

import { logout } from "../../utils/helpers";

import ASButton from "../ASButton/ASButton";

function Settings({ intl }) {
  return (
    <div className="settings-page">
      <ASButton
        label={intl.formatMessage({ id: "common.logout" })}
        onClick={logout}
      />
    </div>
  );
}

export default injectIntl(Settings);
