import React from "react";
import { ConfigProvider } from "antd";
import ReactDOM from "react-dom/client";

import { UserContext } from "./contexts/user.context";
import { LayoutContext } from "./contexts/layout.context";
import { getLocale } from "./utils/intl-provider";

import IntlWrapper from "./components/IntlWrapper/IntlWrapper";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
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
  </React.StrictMode>
);
