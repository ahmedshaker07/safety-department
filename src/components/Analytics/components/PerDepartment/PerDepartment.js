import { injectIntl } from "react-intl";

import AnalyticCard from "../AnalyticCard/AnalyticCard";
import AvgActionsPerDepartment from "./components/AvgActionsPerDepartment";
import AvgDurationPerDepartment from "./components/AvgDurationPerDepartment";
import AvgObservedPerDepartment from "./components/AvgObservedPerDepartment";

function PerDepartment() {
  return (
    <>
      <AnalyticCard title="Average number of actions per department">
        <AvgActionsPerDepartment />
      </AnalyticCard>
      <AnalyticCard title="Average report duration per department">
        <AvgDurationPerDepartment />
      </AnalyticCard>
      <AnalyticCard title="Average number of people observed per department">
        <AvgObservedPerDepartment />
      </AnalyticCard>
    </>
  );
}

export default injectIntl(PerDepartment);
