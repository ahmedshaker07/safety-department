import React, { createContext, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { notification } from "antd";

export const LayoutContextWrapper = createContext({ name: "" });

export const LayoutContext = ({ children }) => {
  const [isSidebarHidden, setIsSidebarHidden] = useState(false);

  const [api, contextHolder] = notification.useNotification();

  const isLargeMobileScreen = useMediaQuery({ maxWidth: "992px" });

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
    <LayoutContextWrapper.Provider
      value={{
        isSidebarHidden,
        setIsSidebarHidden,
        openNotification,
      }}
    >
      {contextHolder}
      {children}
    </LayoutContextWrapper.Provider>
  );
};
