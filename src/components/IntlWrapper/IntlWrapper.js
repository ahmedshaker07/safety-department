import { useEffect } from "react";
import { messages } from "../../messages";
import { RawIntlProvider, createIntl, createIntlCache } from "react-intl";

import {
  changeDocumentDirection,
  flattenMessages,
  getLocale,
} from "../../utils/intl-provider";

const locale = getLocale();
localStorage.setItem("locale", locale);
const cache = createIntlCache();
const intl = createIntl(
  {
    locale: locale,
    messages: flattenMessages(messages[locale]),
  },
  cache
);

export const fmt = intl.formatMessage;

const IntlWrapper = ({ children }) => {
  useEffect(() => {
    document.documentElement.lang = locale;
    changeDocumentDirection(locale);
  }, []);

  return <RawIntlProvider value={intl}>{children}</RawIntlProvider>;
};

export default IntlWrapper;
