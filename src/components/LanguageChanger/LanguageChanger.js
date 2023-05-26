import { injectIntl } from "react-intl";
import { Select } from "antd";

import { changeLocale, getLocale } from "../../utils/intl-provider";
import { LOCALE } from "../../constants/intl-wrapper";

function LanguageChanger({ intl }) {
  return (
    <Select
      defaultValue={getLocale()}
      onChange={changeLocale}
      options={[
        {
          value: LOCALE.EN,
          label: intl.formatMessage({ id: "header.languages.english" })
        },
        {
          value: LOCALE.AR,
          label: intl.formatMessage({ id: "header.languages.arabic" })
        },
        {
          value: LOCALE.FR,
          label: intl.formatMessage({ id: "header.languages.french" })
        }
      ]}
    />
  );
}

export default injectIntl(LanguageChanger);
