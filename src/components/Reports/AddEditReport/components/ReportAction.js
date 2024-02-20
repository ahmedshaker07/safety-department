import { Form, Select, Input, Divider } from "antd";
import { MinusCircleOutlined } from "@ant-design/icons";

import { SAFE_ACTION, UNSAFE_ACTION } from "../../../../constants/actions";

import { fmt } from "../../../IntlWrapper/IntlWrapper";

const ReportAction = ({
  id,
  name,
  type,
  restField,
  placeholder,
  formattedTypeActions,
  fields,
  remove,
  form,
}) => {
  const actionId = Form.useWatch(
    [
      { SAFE_ACTION: "safeactions", UN_SAFE_ACTION: "unsafeactions" }[type],
      name,
      "actionId",
    ],
    form
  );

  const showCommentActionId = {
    SAFE_ACTION: 36,
    UN_SAFE_ACTION: 37,
  };

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <div>
      <Form.Item className="add-edit-report__action" key={id}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: "12px",
          }}
        >
          <Form.Item
            name={[name, "actionId"]}
            rules={[
              {
                required: type === SAFE_ACTION,
                message: fmt({ id: "common.required" }),
              },
            ]}
            {...restField}
          >
            <Select
              showSearch
              optionFilterProp="children"
              filterOption={filterOption}
              options={formattedTypeActions}
              placeholder={placeholder}
              virtual={false}
            />
          </Form.Item>
          {actionId === showCommentActionId[type] && (
            <Form.Item
              name={[name, "comment"]}
              rules={[
                {
                  required: true,
                  message: fmt({ id: "common.required" }),
                },
              ]}
              {...restField}
            >
              <Input placeholder={fmt({ id: "reports.comment" })} />
            </Form.Item>
          )}
        </div>
        {(type === UNSAFE_ACTION || fields.length > 1) && (
          <MinusCircleOutlined onClick={() => remove(name)} />
        )}
      </Form.Item>
      {id < fields.length - 1 && fields.length > 1 && (
        <Divider style={{ margin: "24px 0 12px" }} />
      )}
    </div>
  );
};

export default ReportAction;
