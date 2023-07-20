import { useState, useEffect, useRef } from "react";
// import { Modal, Upload } from "antd";
// import { PlusOutlined } from "@ant-design/icons";
import { injectIntl } from "react-intl";

// import {
//   uploadImages,
//   uploadImagesToServerAndGetLink,
// } from "../../../../services/reports";
// import { ACCEPTED_IMAGE_TYPES } from "../../../../constants/helpers";
// import { ContextWrapper } from "../../../../contexts/layout.context";

const ReportsImages = ({ intl }) => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  const [uploadedImages, setUploadedImages] = useState([]);

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dayzz4std",
        uploadPreset: "w7vi2u6u",
      },
      (error, result) => {
        if (result.event === "success") {
          setUploadedImages([...uploadedImages, result.info.secure_url]);
        }
      }
    );
  }, [uploadedImages]);

  return (
    <>
      <button onClick={() => widgetRef.current.open()}>
        Upload Via Widget
      </button>
      {uploadedImages.map((image, index) => (
        <img key={index} src={image} alt="" />
      ))}
    </>
  );
};
export default injectIntl(ReportsImages);
