import { injectIntl } from "react-intl";

const ReportsFooter = ({ intl }) => {
  return (
    <span className="body-medium">
      {intl.formatMessage({ id: "reports.footer" })}
      <span className="as-text-red ">
        {intl.formatMessage({ id: "reports.safety" })}
      </span>
    </span>
  );
};

export default injectIntl(ReportsFooter);
