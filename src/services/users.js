import http from "../http.js";

export const createUser = (payload) => {
  return http.post("/users/register", payload);
};

export const getAllUsers = (payload) => {
  return http.get("/users", payload);
};

export const editUser = (id, payload) => {
  return http.put(`/users/${id}`, payload);
};

export const deleteUser = (id) => {
  return http.delete(`/users/${id}`);
};
