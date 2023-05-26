import { injectIntl } from "react-intl";
import { Select } from "antd";
import { GlobalOutlined } from "@ant-design/icons";

import { changeLocale, getLocale } from "../../utils/intl-provider";
import { LOCALE } from "../../constants/intl-wrapper";

import "./ASLanguageChanger.scss";

function ASLanguageChanger({ intl }) {
  return (
    <Select
      className="as-language-changer"
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
      suffixIcon={<GlobalOutlined />}
    />
  );
}

export default injectIntl(ASLanguageChanger);
