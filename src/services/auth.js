import http from "../http.js";

export const login = (data) => {
  return http.post("/users/login", data);
};

export const register = () => {
  return http.post("/users/register", {
    email: "ecpcadmin@yopmail.com",
    password: "12345",
    firstName: "Ahmed",
    lastName: "Shaker",
  });
};
