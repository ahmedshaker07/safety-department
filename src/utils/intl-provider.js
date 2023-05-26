import { LOCALE } from "../constants/intl-wrapper";
import { messages } from "../messages";

export const flattenMessages = (nestedMessages = messages.en, prefix = "") => {
  return Object.keys(nestedMessages).reduce((messages, key) => {
    const value = nestedMessages[key];
    const prefixedKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === "string") {
      Object.assign(messages, { [prefixedKey]: value });
    } else {
      Object.assign(messages, flattenMessages(value, prefixedKey));
    }

    return messages;
  }, {});
};

export const getLocale = () => {
  return localStorage.getItem("locale") || "ar";
};

export const changeLocale = (newLocale) => {
  localStorage.setItem("locale", newLocale);
  window.location.reload();
};

export const changeDocumentDirection = (locale) => {
  if ([LOCALE.AR].includes(locale)) {
    document.dir = "rtl";
  } else {
    document.dir = "ltr";
  }
};
