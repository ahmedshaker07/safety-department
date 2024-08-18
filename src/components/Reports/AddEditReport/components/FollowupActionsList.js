import { injectIntl } from "react-intl";
import { Form, Input, Button, Divider } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Select } from "antd";

const FollowupActionsList = ({
  name,
  placeholder,
  ctaLabel,
  limit,
  intl,
  users,
}) => {
  const formattedUsers = users.map(({ id, fullName }) => ({
    value: id,
    label: fullName,
  }));

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <Form.List name={name}>
      {(fields, { add, remove }) => {
        return (
          <>
            {fields.map(({ key, name, ...restField }, index) => (
              <div key={key}>
                <div className="add-edit-report__followup-action">
                  <Form.Item className="add-edit-report__action">
                    <Form.Item name={[name, "actionName"]} {...restField}>
                      <Input placeholder={placeholder} />
                    </Form.Item>
                    <div>
                      <Form.Item name={[name, "userId"]} {...restField}>
                        <Select
                          showSearch
                          optionFilterProp="children"
                          filterOption={filterOption}
                          options={formattedUsers}
                          placeholder={intl.formatMessage({
                            id: "reports.assigned_to",
                          })}
                        />
                      </Form.Item>
                    </div>
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </div>
                {index !== fields.length - 1 && fields.length > 1 && (
                  <Divider />
                )}
              </div>
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
        );
      }}
    </Form.List>
  );
};

export default injectIntl(FollowupActionsList);
