import { Form, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { injectIntl } from "react-intl";

import { SAFE_ACTION } from "../../../../constants/actions";
import ReportAction from "./ReportAction";
import { getLocale } from "../../../../utils/intl-provider";

const ActionsList = ({
  name,
  type,
  placeholder,
  ctaLabel,
  limit,
  typeActions = [],
  form,
}) => {
  const formattedTypeActions = typeActions.map(
    ({ id, name = "", nameAr = "" }) => ({
      value: id,
      label: getLocale() === "en" ? name || nameAr : nameAr || name,
    })
  );

  return (
    <Form.List name={name} rules={[{ required: type === SAFE_ACTION }]}>
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, ...restField }, index) => (
            <ReportAction
              id={key}
              name={name}
              type={type}
              restField={restField}
              formattedTypeActions={formattedTypeActions}
              fields={fields}
              remove={remove}
              form={form}
              placeholder={placeholder}
              index={index}
            />
          ))}
          {fields.length < limit && (
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                icon={<PlusOutlined />}
              >
                {ctaLabel}
              </Button>
            </Form.Item>
          )}
        </>
      )}
    </Form.List>
  );
};

export default injectIntl(ActionsList);
