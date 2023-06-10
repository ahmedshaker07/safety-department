import { useState } from "react";
import { injectIntl } from "react-intl";
import { useNavigate } from "react-router-dom";
import { Form } from "antd";

import { DEFAULT_ACTIONS } from "../../../constants/reports";

import CreateEditLayout from "../../Layouts/CreateEditLayout/CreateEditLayout";
import ReportsCards from "./components/ReportsCard";
import ReportsInfoCard from "./components/ReportsInfoCard";
import ReportsFooter from "./components/ReportsFooter";
import ReportsFirstSection from "./components/ReportsFirstSection";
import ActionsList from "./components/ActionsList";
import FollowupActionsList from "./components/FollowupActionsList";
import ReportsImages from "./components/ReportsImages";

import "./AddEditReport.scss";

function AddEditReport({ intl }) {
  const [actions, setActions] = useState(DEFAULT_ACTIONS);

  const navigate = useNavigate();

  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  return (
    <CreateEditLayout
      form={form}
      onFinish={onFinish}
      className="add-edit-report__form"
      onCancelClick={() => navigate("/reports")}
    >
      <ReportsFirstSection />

      <ReportsCards title={intl.formatMessage({ id: "reports.safe_acts" })}>
        <ActionsList
          name="safeactions"
          arr={actions.safe}
          type="safe"
          placeholder={intl.formatMessage({
            id: "reports.safe_action",
          })}
          ctaLabel={intl.formatMessage({ id: "reports.add_safe_action" })}
          limit={7}
          form={form}
          actions={actions}
          setActions={setActions}
        />
      </ReportsCards>

      <ReportsInfoCard title={intl.formatMessage({ id: "reports.hsm" })} />

      <ReportsCards title={intl.formatMessage({ id: "reports.unsafe_acts" })}>
        <ActionsList
          name="unsafeactions"
          arr={actions.unsafe}
          type="unsafe"
          placeholder={intl.formatMessage({
            id: "reports.unsafe_action",
          })}
          ctaLabel={intl.formatMessage({ id: "reports.add_unsafe_action" })}
          limit={7}
          form={form}
          actions={actions}
          setActions={setActions}
        />
      </ReportsCards>

      <ReportsCards
        title={intl.formatMessage({ id: "reports.agreed_followups" })}
      >
        <FollowupActionsList
          name="followupactions"
          arr={actions.followup}
          type="followup"
          placeholder={intl.formatMessage({
            id: "reports.followup_action",
          })}
          ctaLabel={intl.formatMessage({ id: "reports.add_followup_action" })}
          limit={4}
          form={form}
          actions={actions}
          setActions={setActions}
        />
      </ReportsCards>

      <ReportsInfoCard title={intl.formatMessage({ id: "reports.nmha" })} />

      <ReportsCards title={intl.formatMessage({ id: "reports.images" })}>
        <ReportsImages />
      </ReportsCards>

      <ReportsFooter />
    </CreateEditLayout>
  );
}

export default injectIntl(AddEditReport);
