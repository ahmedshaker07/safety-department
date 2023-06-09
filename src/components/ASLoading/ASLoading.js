import React from "react";
import { Spin } from "antd";

const ASLoading = () => {
  return (
    <Spin
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    />
  );
};

export default ASLoading;
