import { injectIntl } from "react-intl";

import ColumnChart from "./components/Column/Column";
import LineChart from "./components/Line/Line";
import AreaChart from "./components/AreaChart/AreaChart";

import "./Overview.scss";

function Overview() {
  return (
    <div className="overview-page">
      <div className="overview-page__header">
        <div>
          <span className="body-medium">Days since an incident</span>
          <span className="caption-medium">135</span>
        </div>
        <div>
          <span className="body-medium">Critical incidents this year</span>
          <span className="caption-medium">1</span>
        </div>
        <div>
          <span className="body-medium">Incidents this year</span>
          <span className="caption-medium">13</span>
        </div>
        <div>
          <span className="body-medium">Number of Reports this year</span>
          <span className="caption-medium">385</span>
        </div>
      </div>
      <div className="overview-page__charts">
        <ColumnChart />
        <LineChart />
      </div>
      <AreaChart />
    </div>
  );
}

export default injectIntl(Overview);
