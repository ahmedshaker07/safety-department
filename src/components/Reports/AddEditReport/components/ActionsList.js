import { Form, Input, Button } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

const ActionsList = ({
  name,
  arr,
  type,
  placeholder,
  ctaLabel,
  limit,
  actions,
  setActions,
  form,
}) => {
  return (
    <Form.List name={name}>
      {() => (
        <>
          {arr.map((field) => (
            <Form.Item className="add-edit-report__action" key={field.key}>
              <Form.Item {...field} noStyle>
                <Input placeholder={placeholder} />
              </Form.Item>
              {arr.length > 1 && (
                <MinusCircleOutlined
                  onClick={() => {
                    setActions((prevActions) => {
                      return {
                        ...prevActions,
                        [type]: [...prevActions[type]].filter(
                          (action) => action.key !== field.key
                        ),
                      };
                    });
                    form.resetFields([[name, field.name]]);
                  }}
                />
              )}
            </Form.Item>
          ))}
          {arr.length < limit && (
            <Form.Item>
              <Button
                type="dashed"
                onClick={() =>
                  setActions({
                    ...actions,
                    [type]: [
                      ...actions[type],
                      {
                        name: `${type}-${arr[arr.length - 1].key + 1}`,
                        key: arr[arr.length - 1].key + 1,
                      },
                    ],
                  })
                }
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
