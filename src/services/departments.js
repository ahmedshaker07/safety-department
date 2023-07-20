import http from "../http.js";

export const createDepartment = (payload) => {
  return http.post("/departments", payload);
};

export const getAllDepartments = (payload) => {
  return http.get("/departments", payload);
};

export const editDepartment = (id, payload) => {
  return http.put(`/departments/${id}`, payload);
};
