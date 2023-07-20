import { Form, Button, Select } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

import { SAFE_ACTION, UNSAFE_ACTION } from "../../../../constants/actions";
import { fmt } from "../../../IntlWrapper/IntlWrapper";

const ActionsList = ({
  name,
  type,
  placeholder,
  ctaLabel,
  limit,
  typeActions = [],
}) => {
  const formattedTypeActions = typeActions.map(({ id, name }) => ({
    value: id,
    label: name,
  }));

  return (
    <Form.List name={name} rules={[{ required: type === SAFE_ACTION }]}>
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, ...restField }) => (
            <Form.Item className="add-edit-report__action" key={key}>
              <Form.Item
                name={[name, type]}
                rules={[
                  {
                    required: type === SAFE_ACTION,
                    message: fmt({ id: "common.required" }),
                  },
                ]}
                {...restField}
              >
                <Select
                  placeholder={placeholder}
                  options={formattedTypeActions}
                />
              </Form.Item>
              {(type === UNSAFE_ACTION || fields.length > 1) && (
                <MinusCircleOutlined onClick={() => remove(name)} />
              )}
            </Form.Item>
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

export default ActionsList;
