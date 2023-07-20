import { Form, Input, Select, InputNumber } from "antd";

import { fmt } from "../../../IntlWrapper/IntlWrapper";

const ReportsFirstSection = ({ departments }) => {
  const formattedDepartments = departments.map(({ id, name }) => ({
    value: id,
    label: name,
  }));

  return (
    <div className="add-edit-report__card">
      <Form.Item
        label={fmt({ id: "reports.area" })}
        name="departmentId"
        rules={[{ required: true, message: fmt({ id: "common.required" }) }]}
      >
        <Select
          placeholder={fmt({ id: "reports.area" })}
          options={formattedDepartments}
          virtual={false}
        />
      </Form.Item>

      <Form.Item
        label={fmt({ id: "reports.assessor" })}
        name="assessor"
        initialValue="Ahmed Shaker"
      >
        <Input placeholder={fmt({ id: "reports.assessor" })} disabled />
      </Form.Item>

      <Form.Item label={fmt({ id: "reports.assited" })} name="assistorName">
        <Input placeholder={fmt({ id: "reports.assited" })} />
      </Form.Item>

      <Form.Item
        label={fmt({ id: "reports.observed" })}
        name="NumberOfObservers"
      >
        <InputNumber placeholder={fmt({ id: "reports.observed" })} min={1} />
      </Form.Item>
    </div>
  );
};

export default ReportsFirstSection;
