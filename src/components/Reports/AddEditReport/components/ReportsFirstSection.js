import { Form, Input } from "antd";

import { FIRST_SECTION_FIELDS } from "../../../../constants/reports";

const ReportsFirstSection = () => {
  return (
    <div className="add-edit-report__first-section">
      {Object.keys(FIRST_SECTION_FIELDS).map((direction, index) => (
        <div className="add-edit-report__card" key={index}>
          {FIRST_SECTION_FIELDS[direction].map(
            ({ name, label, placeholder }, index) => (
              <Form.Item key={index} label={label} name={name}>
                <Input placeholder={placeholder} />
              </Form.Item>
            )
          )}
        </div>
      ))}
    </div>
  );
};

export default ReportsFirstSection;
