import http from "../http.js";

export const uploadImagesToServerAndGetLink = ({
  formData,
  bucketName,
  onUploadProgress,
}) => {
  const config = {
    onUploadProgress,
  };
  return http.postForm(`/uploadImage/${bucketName}`, formData, config);
};

export const uploadImages = ({ formData }) => {
  return http.postForm(
    `https://api.cloudinary.com/v1_1/dayzz4std/upload`,
    formData
  );
};

export const createReport = (payload) => {
  return http.post("/reports", payload);
};
