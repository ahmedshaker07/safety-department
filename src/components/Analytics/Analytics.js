import { Tabs } from "antd";
import { injectIntl } from "react-intl";

import PerDepartment from "./components/PerDepartment/PerDepartment";
import PerAction from "./components/PerAction/PerAction";
import PerDate from "./components/PerDate/PerDate";

import "./Analytics.scss";

function Analytics() {
  return (
    <Tabs
      defaultActiveKey="Per Department"
      type="card"
      animated
      items={[
        { name: "Per Department", component: PerDepartment },
        { name: "Per Date", component: PerDate },
        { name: "Per Action", component: PerAction },
      ].map(({ name, component: Component }, idx) => {
        return {
          label: name,
          key: idx,
          children: <Component />,
          className: "analytics-tabpane",
        };
      })}
    />
  );
}

export default injectIntl(Analytics);
