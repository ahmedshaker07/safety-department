import { useContext, useState } from "react";
import { Modal, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { injectIntl } from "react-intl";

import { uploadImagesToServerAndGetLink } from "../../../../services/reports";
import { ACCEPTED_IMAGE_TYPES } from "../../../../constants/helpers";
import { ContextWrapper } from "../../../../contexts/layout.context";

const ReportsImages = ({ intl }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);

  const { openNotification } = useContext(ContextWrapper);

  const handleCancel = () => setPreviewOpen(false);

  const handleUploadChange = async (info) => {
    setFileList(info.fileList.filter((file) => !!file.status));
  };

  const beforeImageUpload = (file) => {
    const isAcceptedType = ACCEPTED_IMAGE_TYPES.includes(file.type);
    const isLtSize = file.size / 1024 / 1024 <= 10;
    if (!isLtSize || !isAcceptedType) {
      openNotification({
        title: intl.formatMessage({ id: "reports.image_error" }),
        type: "error",
      });
    }
    return isLtSize && isAcceptedType;
  };

  const uploadImage = async ({ onSuccess, onError, file }) => {
    try {
      const formData = new FormData();
      formData.append("image", file);
      const response = await uploadImagesToServerAndGetLink({
        formData,
        bucketName: "report-images",
      });
      setPreviewImage(response);
      onSuccess();
    } catch (error) {
      openNotification({
        title: error,
        type: "error",
      });
    }
  };

  return (
    <>
      <Upload
        listType="picture-card"
        accept=".png, .jpg, .jpeg"
        maxCount={8}
        fileList={fileList}
        onChange={handleUploadChange}
        customRequest={uploadImage}
        beforeUpload={beforeImageUpload}
        showUploadList={false}
      >
        {fileList.length < 8 && (
          <div>
            <PlusOutlined />
            <div
              style={{
                marginTop: 8,
              }}
            >
              {intl.formatMessage({ id: "common.upload" })}
            </div>
          </div>
        )}
      </Upload>
      <Modal
        open={previewOpen}
        title={null}
        footer={null}
        onCancel={handleCancel}
        closeIcon={<></>}
      >
        <img
          alt=""
          style={{
            width: "100%",
          }}
          src={previewImage}
        />
      </Modal>
    </>
  );
};
export default injectIntl(ReportsImages);
