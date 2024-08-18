import http from "../http.js";

export const login = (data) => {
  return http.post("/users/login", data);
};

export const getUserLoginDetails = () => {
  return http.get("/users/userInfo");
};

export const sendResetPasswordOtp = (data) => {
  return http.post("/users/reset-password-otp", data);
};

export const resetPassword = (data) => {
  return http.post("/users/reset-password", data);
};
