import dayjs from "dayjs";
import isBoolean from "lodash/isBoolean";
import DOMPurify from "dompurify";
import PickerArabic from "antd/es/date-picker/locale/ar_EG";
import PickerEnglish from "antd/es/date-picker/locale/en_US";
import PickerFrench from "antd/es/date-picker/locale/fr_FR";

import { END_DATES_KEYS } from "../constants/helpers";
import { getLocale } from "./intl-provider";
import { fmt } from "../components/IntlWrapper/IntlWrapper";

export function retry(fn, retriesLeft = 5, interval = 1000) {
  return new Promise((resolve, reject) => {
    fn()
      .then(resolve)
      .catch((error) => {
        setTimeout(() => {
          if (retriesLeft === 1) {
            // reject('maximum retries exceeded');
            window.location.reload();
            return;
          }

          // Passing on "reject" is the important part
          retry(fn, retriesLeft - 1, interval).then(resolve, reject);
        }, interval);
      });
  });
}

const { sanitize } = DOMPurify;
// eslint-disable-next-line
const javascriptPurify = (dirty) => dirty.replace(/^(javascript\:)/, "");

export const sanitizeText = (text) =>
  text && !isBoolean(text) ? javascriptPurify(sanitize(text)) : text;

const formatDateUTC = (date, key) => {
  if (END_DATES_KEYS.includes(key)) {
    return date
      .utc()
      .set("hour", 23)
      .set("minute", 59)
      .set("second", 59)
      .format();
  }
  return date.utc().set("hour", 0).set("minute", 0).set("second", 0).format();
};

export const cleanEmptyString = (obj) => {
  if (dayjs.isDayjs(obj)) return obj;
  if (Array.isArray(obj)) {
    return obj
      .map((v) => (v && typeof v === "object" ? cleanEmptyString(v) : v))
      .filter((v) => !(v === "" || v === undefined || v === null));
  } else {
    return Object.entries(obj)
      .map(([k, v]) => [
        k,
        v && typeof v === "object" ? cleanEmptyString(v) : v,
      ])
      .reduce(
        (a, [k, v]) =>
          v === "" || v === null || v === undefined ? a : ((a[k] = v), a),
        {}
      );
  }
};

/**
 * sanitize obj with nested objects and other types
 * @param obj
 * @returns {{}|*}
 */
export const sanitizeAll = (obj) => {
  // test for moment objects, undefined, numbers, or booleans
  if (
    dayjs.isDayjs(obj) ||
    typeof obj === "undefined" ||
    typeof obj === "number" ||
    typeof obj === "boolean"
  ) {
    if (dayjs.isDayjs(obj)) return formatDateUTC(obj);
    else return obj;
  }
  // test for strings
  if (typeof obj !== "object") {
    return sanitizeText(obj);
  }
  // sanitize object and its nested items after being cleansed from empty and undefined values
  return Object.entries(cleanEmptyString(obj))
    .map(([key, value]) => [
      key,
      typeof value === "object" && !dayjs.isDayjs(value)
        ? Array.isArray(value)
          ? value.map((item) => sanitizeAll(item))
          : sanitizeAll(value)
        : typeof value === "number"
        ? value
        : dayjs.isDayjs(value)
        ? formatDateUTC(value, key)
        : sanitizeText(value),
    ])
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
};

export const logout = () => {
  const locale = localStorage.getItem("locale");
  localStorage.clear();
  localStorage.setItem("locale", locale ? locale : "ar");
  window.location.replace("/signin");
};

export const getRangePickerLocale = () => {
  const locale = getLocale();
  const pickerLocal = {
    en: PickerEnglish,
    ar: PickerArabic,
    fr: PickerFrench,
  };

  return pickerLocal[locale];
};

export const dates = (value, format) => {
  const date = format
    ? dayjs(value).tz("Africa/Cairo").format(format)
    : dayjs(value).tz("Africa/Cairo");
  return date;
};

export const checkDate = (date) => {
  if (dayjs(date).isToday()) {
    return fmt({ id: `common.today` });
  } else if (dayjs(date).isYesterday()) {
    return fmt({ id: `common.yesterday` });
  } else if (dayjs(date).isTomorrow()) {
    return fmt({ id: `common.tomorrow` });
  } else {
    return;
  }
};

export const checkSmartDate = (date, format = "ddd, DD MMM") => {
  const formattedDate = checkDate(date);
  if (formattedDate) {
    return formattedDate;
  } else {
    return dates(date, format);
  }
};
