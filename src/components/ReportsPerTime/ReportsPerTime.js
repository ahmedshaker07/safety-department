import { Tabs } from "antd";

import ReportsPerPeriod from "./components/ReportsPerPeriod";

import "./ReportsPerTime.scss";

function ReportsPerTime() {
  return (
    <Tabs
      defaultActiveKey="Per Day"
      type="card"
      animated
      items={[
        {
          name: "Per Day",
          groupBy: "day",
          component: ReportsPerPeriod,
        },
        {
          name: "Per Week",
          groupBy: "week",
          component: ReportsPerPeriod,
        },
        {
          name: "Per Month",
          groupBy: "month",
          component: ReportsPerPeriod,
        },
        {
          name: "Per Year",
          groupBy: "year",
          component: ReportsPerPeriod,
        },
      ].map(({ name, groupBy, component: Component }, idx) => {
        return {
          label: name,
          key: idx,
          children: <Component groupBy={groupBy} />,
        };
      })}
    />
  );
}

export default ReportsPerTime;
