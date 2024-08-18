import { useContext } from "react";
import { Form, Input, Select, InputNumber } from "antd";

import { fmt } from "../../../IntlWrapper/IntlWrapper";
import { ContextWrapper } from "../../../../contexts/user.context";
import { getLocale } from "../../../../utils/intl-provider";

const ReportsFirstSection = ({ form, departments }) => {
  const { userData } = useContext(ContextWrapper);

  const departmentId = Form.useWatch("departmentId", form);
  const formattedDepartments = departments.map(
    ({ id, name = "", nameAr = "" }) => ({
      value: id,
      label: getLocale() === "en" ? name || nameAr : nameAr || name,
    })
  );

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <div className="add-edit-report__card">
      <Form.Item
        label={fmt({ id: "reports.area" })}
        name="departmentId"
        rules={[{ required: true, message: fmt({ id: "common.required" }) }]}
      >
        <Select
          showSearch
          optionFilterProp="children"
          filterOption={filterOption}
          options={formattedDepartments}
          placeholder={fmt({ id: "reports.area" })}
        />
      </Form.Item>

      {departmentId === 48 && (
        <Form.Item
          name="customArea"
          rules={[{ required: true, message: fmt({ id: "common.required" }) }]}
        >
          <Input placeholder={fmt({ id: "reports.comment" })} />
        </Form.Item>
      )}

      <Form.Item
        label={fmt({ id: "reports.assessor" })}
        name="assessor"
        initialValue={userData?.fullName}
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
