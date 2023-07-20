import React from "react";
import { ConfigProvider } from "antd";
import ReactDOM from "react-dom/client";
import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";
import isTomorrow from "dayjs/plugin/isTomorrow";
import tz from "dayjs/plugin/timezone";

import { UserContext } from "./contexts/user.context";
import { LayoutContext } from "./contexts/layout.context";
import { getLocale } from "./utils/intl-provider";

import IntlWrapper from "./components/IntlWrapper/IntlWrapper";
import App from "./App";

dayjs.extend(tz);
dayjs.extend(isToday);
dayjs.extend(isYesterday);
dayjs.extend(isTomorrow);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <IntlWrapper>
    <ConfigProvider
      locale={getLocale()}
      getPopupContainer={(trigger) => trigger?.parentElement || document.body}
    >
      <LayoutContext>
        <UserContext>
          <App />
        </UserContext>
      </LayoutContext>
    </ConfigProvider>
  </IntlWrapper>
);
