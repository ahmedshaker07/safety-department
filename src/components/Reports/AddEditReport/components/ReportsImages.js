import { useContext, useEffect, useRef, useState } from "react";
import { injectIntl } from "react-intl";
import { Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import { LayoutContextWrapper } from "../../../../contexts/layout.context";
import { uploadImages } from "../../../../services/reports";

const ReportsImages = ({ intl, images, setImages, report }) => {
  const { openNotification } = useContext(LayoutContextWrapper);

  const [fileList, setFileList] = useState([]);

  const uploadRef = useRef();

  const handleChange = (info) => {
    setFileList(info.fileList.filter((file) => !!file.status));
  };

  const customRequest = async ({ onSuccess, onError, file }) => {
    try {
      const formData = new FormData();
      formData.append("image", file);
      const response = await uploadImages({ formData });
      onSuccess();
      setImages((oldImages) => [
        ...oldImages,
        { id: file.uid, url: response, isNew: true },
      ]);
    } catch (error) {
      openNotification({
        title: error.message,
        type: "error",
      });
      onError({ error });
    }
  };

  const beforeUpload = (file) => {
    const isLt40M = file.size / 1024 / 1024 <= 40;
    if (!isLt40M) {
      openNotification({
        title: intl.formatMessage({
          id: "international_shipping_in.upload_modal.size_error",
        }),
      });
    }
    return isLt40M;
  };

  const onRemoveImage = (deletedImage) => {
    setImages(images.filter((image) => image.id !== deletedImage.uid));
  };

  useEffect(() => {
    report?.ReportImages &&
      setFileList(
        report.ReportImages.map((report) => ({
          uid: report.id,
          url: report.imageLink,
          status: "done",
        }))
      );
  }, [report?.ReportImages]);

  return (
    <Upload
      ref={uploadRef}
      listType="picture-card"
      accept=".png, .jpg, .jpeg"
      maxCount={10}
      fileList={fileList}
      onChange={handleChange}
      beforeUpload={beforeUpload}
      customRequest={customRequest}
      onRemove={onRemoveImage}
      multiple
    >
      <PlusOutlined />
    </Upload>
  );
};
export default injectIntl(ReportsImages);
