import { injectIntl } from "react-intl";

import AnalyticCard from "../AnalyticCard/AnalyticCard";
import ReportsPerDate from "./components/ReportsPerDate";
import ActionsPerDate from "./components/ActionsPerDate";

function PerDate() {
  return (
    <>
      <AnalyticCard title="Number of actions per day">
        <ActionsPerDate />
      </AnalyticCard>
      <AnalyticCard title="Number of reports per day">
        <ReportsPerDate />
      </AnalyticCard>
    </>
  );
}

export default injectIntl(PerDate);
