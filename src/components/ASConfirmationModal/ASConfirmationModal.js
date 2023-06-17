import { injectIntl } from "react-intl";
import { Modal } from "antd";
import { CloseOutlined } from "@ant-design/icons";

import ASButton from "../ASButton/ASButton";

import "./ASConfirmationModal.scss";

function ASConfirmationModal({
  intl,
  isModalOpen = false,
  setIsModalOpen,
  title,
  description,
  cancelText,
  confirmText,
  onCancel = () => {},
  onConfirm = () => {},
  hasCloseIcon,
}) {
  return (
    <Modal
      open={isModalOpen}
      title={
        <>
          {title}
          {hasCloseIcon && (
            <CloseOutlined
              onClick={() => {
                setIsModalOpen(false);
              }}
            />
          )}
        </>
      }
      centered
      footer={null}
      className="confirmation-modal"
    >
      <span>{description}</span>
      <div className="modal-footer">
        <ASButton
          label={cancelText || intl.formatMessage({ id: "common.cancel" })}
          type="destructive-basic"
          onClick={onCancel}
        />
        <ASButton
          label={confirmText || intl.formatMessage({ id: "common.confirm" })}
          onClick={onConfirm}
        />
      </div>
    </Modal>
  );
}

export default injectIntl(ASConfirmationModal);
