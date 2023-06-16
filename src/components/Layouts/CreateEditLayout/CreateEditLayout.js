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
}) {
  return (
    <Form
      className={classNames("create-edit-layout", className)}
      layout="vertical"
      onFinish={onFinish}
      form={form}
      initialValues={initialFormValues}
    >
      <div className="add-edit-report__actions">
        {actions || (
          <>
            <ASButton
              type="destructive-basic"
              label={intl.formatMessage({ id: "common.cancel" })}
              onClick={onCancelClick}
            />
            <ASButton
              label={intl.formatMessage({ id: "common.save" })}
              htmlType="submit"
            />
          </>
        )}
      </div>
      {children}
    </Form>
  );
}

export default injectIntl(CreateEditLayout);
