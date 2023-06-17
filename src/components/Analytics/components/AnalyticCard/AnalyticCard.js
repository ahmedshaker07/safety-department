import { injectIntl } from "react-intl";

import "./AnalyticCard.scss";

function AnalyticCard({ title, children }) {
  return (
    <div className="analytics-card">
      <span className="body-medium">{title}</span>
      {children}
    </div>
  );
}

export default injectIntl(AnalyticCard);
