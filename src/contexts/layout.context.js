import React, { createContext, useEffect, useState } from "react";
import { useMedia } from "use-media";

export const ContextWrapper = createContext({ name: "" });

export const LayoutContext = ({ children }) => {
  const [isSidebarHidden, setIsSidebarHidden] = useState(false);

  const isLargeMobileScreen = useMedia({ maxWidth: "992px" });

  useEffect(() => {
    setIsSidebarHidden(isLargeMobileScreen);
  }, [isLargeMobileScreen]);

  return (
    <ContextWrapper.Provider
      value={{
        isSidebarHidden,
        setIsSidebarHidden,
      }}
    >
      {children}
    </ContextWrapper.Provider>
  );
};
