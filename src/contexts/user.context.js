import React, { createContext, useEffect, useState } from "react";

import { getUserLoginDetails } from "../services/auth";

export const ContextWrapper = createContext({ name: "" });

export const UserContext = ({ children }) => {
  const [isFetchingInitialData, setIsFetchingInitialData] = useState(true);
  const [token, setToken] = useState("");
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const initializeApp = async () => {
      const storageToken = localStorage.getItem("token") || "";
      setToken(storageToken);
      if (storageToken) {
        const userLoginDetails = await getUserLoginDetails();
        setUserData(userLoginDetails);
      }
      setIsFetchingInitialData(false);
    };

    initializeApp();
  }, []);

  return (
    <ContextWrapper.Provider
      value={{
        isFetchingInitialData,
        token,
        setToken,
        userData,
        setUserData,
      }}
    >
      {children}
    </ContextWrapper.Provider>
  );
};
