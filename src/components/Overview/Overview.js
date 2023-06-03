import { injectIntl } from "react-intl";

import ColumnChart from "./components/Column/Column";
import LineChart from "./components/Line/Line";
import AreaChart from "./components/AreaChart/AreaChart";

import "./Overview.scss";

function Overview({ intl }) {
  return (
    <div className="overview-page">
      <div className="overview-page__header">
        <div>
          <span className="body-medium">
            {intl.formatMessage({ id: "overview.metrics.days" })}
          </span>
          <span className="caption-medium">135</span>
        </div>
        <div>
          <span className="body-medium">
            {intl.formatMessage({ id: "overview.metrics.critical_incidents" })}
          </span>
          <span className="caption-medium">1</span>
        </div>
        <div>
          <span className="body-medium">
            {intl.formatMessage({ id: "overview.metrics.incidents" })}
          </span>
          <span className="caption-medium">13</span>
        </div>
        <div>
          <span className="body-medium">
            {intl.formatMessage({ id: "overview.metrics.reports" })}
          </span>
          <span className="caption-medium">385</span>
        </div>
      </div>
      <div className="overview-page__charts">
        <div className="overview-page__card">
          <ColumnChart />
        </div>
        <div className="overview-page__card">
          <LineChart />
        </div>
      </div>
      <div className="overview-page__card">
        <AreaChart />
      </div>
    </div>
  );
}

export default injectIntl(Overview);
