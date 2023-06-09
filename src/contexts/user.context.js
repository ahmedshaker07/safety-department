import React, { createContext, useEffect, useState } from "react";

export const ContextWrapper = createContext({ name: "" });

export const UserContext = ({ children }) => {
  const [isFetchingInitialData, setIsFetchingInitialData] = useState(true);
  const [token, setToken] = useState("");

  useEffect(() => {
    const storageToken = localStorage.getItem("token") || "";
    setToken(storageToken);
    setIsFetchingInitialData(false);
  }, []);

  return (
    <ContextWrapper.Provider
      value={{
        isFetchingInitialData,
        token,
        setToken,
      }}
    >
      {children}
    </ContextWrapper.Provider>
  );
};