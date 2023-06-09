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
