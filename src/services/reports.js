import http from "../http.js";

export const uploadImages = ({ formData }) => {
  return http.postForm(`https://vflbe.cyclic.app/images`, formData);
};

export const createReport = (payload) => {
  return http.post("/reports", payload);
};

export const getAllReports = (payload) => {
  return http.get("/reports", payload);
};

export const getReportById = (id) => {
  return http.get(`/reports/${id}`);
};

export const editReport = (id, payload) => {
  return http.put(`/reports/${id}`, payload);
};

export const deleteReport = (id) => {
  return http.delete(`/reports/${id}`);
};

export const getReportsByReporter = (payload) => {
  return http.get(`/reports/analytics/usersAnalytics`, payload);
};

export const getReportsByDepartment = (payload) => {
  return http.get(`/reports/analytics/departmentAnalytics`, payload);
};

export const getReportsByTime = (payload) => {
  return http.get(`/reports/analytics/ReportDailyAnalytics`, payload);
};

export const getUserReportStats = () => {
  return http.get(`/reports/analytics/userReportsCount`);
};
