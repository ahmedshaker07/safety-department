import React, { createContext, useEffect, useState } from "react";

export const ContextWrapper = createContext({ name: "" });

export const UserContext = ({ children }) => {
  const [token, setToken] = useState("");

  useEffect(() => {
    const storageToken = localStorage.getItem("token") || "";
    setToken(storageToken);
  }, []);

  return (
    <ContextWrapper.Provider
      value={{
        token,
        setToken,
      }}
    >
      {children}
    </ContextWrapper.Provider>
  );
};
