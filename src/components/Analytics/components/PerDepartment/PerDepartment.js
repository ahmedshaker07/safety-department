import { injectIntl } from "react-intl";

import AnalyticCard from "../AnalyticCard/AnalyticCard";
import ActionsPerDepartment from "./components/ActionsPerDepartment";
import AvgDurationPerDepartment from "./components/AvgDurationPerDepartment";
import AvgObservedPerDepartment from "./components/AvgObservedPerDepartment";

function PerDepartment() {
  return (
    <>
      <AnalyticCard title="Number of actions per department">
        <ActionsPerDepartment />
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
