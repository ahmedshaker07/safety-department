import { injectIntl } from "react-intl";
import { Form, Input, Button, Divider } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

const FollowupActionsList = ({
  name,
  arr,
  type,
  placeholder,
  ctaLabel,
  limit,
  actions,
  setActions,
  form,
  intl,
}) => {
  return (
    <Form.List name={name}>
      {() => (
        <>
          {arr.map((field, index) => (
            <div key={index}>
              <div className="add-edit-report__followup-action">
                <Form.Item className="add-edit-report__action">
                  <Form.Item {...field[0]} noStyle>
                    <Input placeholder={placeholder} />
                  </Form.Item>
                  <div>
                    <Form.Item {...field[1]} noStyle>
                      <Input
                        placeholder={intl.formatMessage({
                          id: "reports.by_whom",
                        })}
                      />
                    </Form.Item>
                    <Form.Item {...field[2]} noStyle>
                      <Input
                        placeholder={intl.formatMessage({
                          id: "reports.by_when",
                        })}
                      />
                    </Form.Item>
                    <Form.Item {...field[3]} noStyle>
                      <Input
                        placeholder={intl.formatMessage({
                          id: "reports.nmha_card",
                        })}
                      />
                    </Form.Item>
                  </div>
                </Form.Item>
                {arr.length > 1 && (
                  <MinusCircleOutlined
                    onClick={() => {
                      setActions((prevActions) => {
                        const newActions = prevActions[type];
                        newActions.splice(index, 1);
                        return {
                          ...prevActions,
                          [type]: newActions,
                        };
                      });
                      form.resetFields([
                        [name, field[0].name],
                        [name, field[1].name],
                        [name, field[2].name],
                        [name, field[3].name],
                      ]);
                    }}
                  />
                )}
              </div>
              {index < arr.length - 1 && arr.length > 1 && <Divider />}
            </div>
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
                      [
                        {
                          name: `followup-${arr[arr.length - 1][0].key + 1}`,
                        },
                        {
                          name: `whom-${arr[arr.length - 1][0].key + 1}`,
                        },
                        {
                          name: `when-${arr[arr.length - 1][0].key + 1}`,
                        },
                        {
                          name: `nmha-${arr[arr.length - 1][0].key + 1}`,
                        },
                      ],
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

export default injectIntl(FollowupActionsList);
