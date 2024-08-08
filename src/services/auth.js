import http from "../http.js";

export const login = (data) => {
  return http.post("/users/login", data);
};

export const getUserLoginDetails = () => {
  return http.get("/users/userInfo");
};

export const sendResetPasswordEmail = (data) => {
  return http.post("/users/reset-password", data);
};
