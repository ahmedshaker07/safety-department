import { Tabs } from "antd";
import { injectIntl } from "react-intl";

import ReportsPerPeriod from "./components/ReportsPerPeriod";

import "./ReportsPerTime.scss";

function ReportsPerTime({ intl }) {
  return (
    <Tabs
      type="card"
      animated
      items={[
        {
          name: intl.formatMessage({ id: "common.per_day" }),
          groupBy: "day",
          component: ReportsPerPeriod,
        },
        {
          name: intl.formatMessage({ id: "common.per_week" }),
          groupBy: "week",
          component: ReportsPerPeriod,
        },
        {
          name: intl.formatMessage({ id: "common.per_month" }),
          groupBy: "month",
          component: ReportsPerPeriod,
        },
        {
          name: intl.formatMessage({ id: "common.per_year" }),
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

export default injectIntl(ReportsPerTime);
