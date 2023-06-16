import React, { createContext, useEffect, useState } from "react";
import { useMedia } from "use-media";
import { notification } from "antd";

export const ContextWrapper = createContext({ name: "" });

export const LayoutContext = ({ children }) => {
  const [isSidebarHidden, setIsSidebarHidden] = useState(false);

  const [api, contextHolder] = notification.useNotification();

  const isLargeMobileScreen = useMedia({ maxWidth: "992px" });

  const openNotification = ({ title, placement = "top", type = "info" }) => {
    api[type]({
      message: title,
      placement,
    });
  };

  useEffect(() => {
    setIsSidebarHidden(isLargeMobileScreen);
  }, [isLargeMobileScreen]);

  return (
    <ContextWrapper.Provider
      value={{
        isSidebarHidden,
        setIsSidebarHidden,
        openNotification,
      }}
    >
      {contextHolder}
      {children}
    </ContextWrapper.Provider>
  );
};
