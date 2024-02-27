import { injectIntl } from "react-intl";
import { Form } from "antd";
import classNames from "classnames";

import ASButton from "../../ASButton/ASButton";

import "./CreateEditLayout.scss";

function CreateEditLayout({
  intl,
  form,
  onCancelClick,
  onFinish,
  className,
  children,
  actions,
  initialFormValues = {},
  isLoading,
  hideCancel = false,
  isSaveDisabled = false,
  addActionsBottom = false,
  handlePDFDownload,
}) {
  const actionsDiv = (
    <div className="add-edit-report__actions">
      {actions || (
        <>
          {handlePDFDownload && (
            <ASButton
              label="PDF"
              disabled={isSaveDisabled}
              onClick={handlePDFDownload}
            />
          )}
          {!hideCancel && (
            <ASButton
              type="destructive-basic"
              label={intl.formatMessage({ id: "common.cancel" })}
              onClick={onCancelClick}
              disabled={isLoading}
            />
          )}
          <ASButton
            label={intl.formatMessage({ id: "common.save" })}
            htmlType="submit"
            isLoading={isLoading}
            disabled={isSaveDisabled}
          />
        </>
      )}
    </div>
  );
  return (
    <Form
      className={classNames("create-edit-layout", className)}
      layout="vertical"
      onFinish={onFinish}
      form={form}
      initialValues={initialFormValues}
    >
      {actionsDiv}
      {children}
      {addActionsBottom && actionsDiv}
    </Form>
  );
}

export default injectIntl(CreateEditLayout);
