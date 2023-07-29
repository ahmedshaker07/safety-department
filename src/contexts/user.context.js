import React, { createContext, useEffect, useState } from "react";

export const ContextWrapper = createContext({ name: "" });

export const UserContext = ({ children }) => {
  const [isFetchingInitialData, setIsFetchingInitialData] = useState(true);
  const [token, setToken] = useState("");
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const storageToken = localStorage.getItem("token") || "";
    setToken(storageToken);
    if (storageToken) {
      //get user data using token
      setUserData({
        id: 3,
        email: "shaker@gmail.com",
        fullName: "Ahmed",
        phoneNumber: "+1245874125",
        role: "ADMIN",
      });
    }
    setIsFetchingInitialData(false);
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
