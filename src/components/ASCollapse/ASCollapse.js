import { Collapse } from "antd";

const ASCollapse = ({ children, panelHeader }) => {
  return (
    <Collapse className="no-text-select">
      <Collapse.Panel header={panelHeader}>{children}</Collapse.Panel>
    </Collapse>
  );
};

export default ASCollapse;
