import http from "../http.js";

export const createAction = (payload) => {
  return http.post("/actions", payload);
};

export const getAllActions = (payload) => {
  return http.get("/actions", payload);
};

export const editAction = (id, payload) => {
  return http.put(`/actions/${id}`, payload);
};

export const deleteAction = (id) => {
  return http.delete(`/actions/${id}`);
};
