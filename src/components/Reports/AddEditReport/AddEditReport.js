import { useContext, useEffect, useState } from "react";
import { injectIntl } from "react-intl";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Spin } from "antd";

import { getAllDepartments } from "../../../services/departments";
import { LayoutContextWrapper } from "../../../contexts/layout.context";
import { getAllActions } from "../../../services/actions";
import { SAFE_ACTION, UNSAFE_ACTION } from "../../../constants/actions";
import { getAllUsers } from "../../../services/users";
import {
  createReport,
  editReport,
  getReportById,
} from "../../../services/reports";
import { removeEmptyValues } from "../../../utils/helpers";

import CreateEditLayout from "../../Layouts/CreateEditLayout/CreateEditLayout";
import ReportsCards from "./components/ReportsCard";
import ReportsFooter from "./components/ReportsFooter";
import ReportsFirstSection from "./components/ReportsFirstSection";
import ActionsList from "./components/ActionsList";
import FollowupActionsList from "./components/FollowupActionsList";
// import ReportsImages from "./components/ReportsImages";

import "./AddEditReport.scss";

function AddEditReport({ intl }) {
  const { openNotification } = useContext(LayoutContextWrapper);

  const [report, setReport] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [safeActions, setSafeActions] = useState([]);
  const [unsafeActions, setUnsafeActions] = useState([]);
  const [users, setUsers] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const { id } = useParams();

  const [form] = Form.useForm();

  const getEditPayload = (
    report,
    {
      departmentId,
      assistorName,
      NumberOfObservers,
      followUpActions,
      actions: newReportActionsIds,
    }
  ) => {
    const oldReportActionsIds = report.ReportActions.map(
      (action) => action.Action.id
    );
    const removedReportActionIds = oldReportActionsIds.filter(
      (id) => !newReportActionsIds.includes(id)
    );
    const removedReportActions = report.ReportActions.filter((action) =>
      removedReportActionIds.includes(action.Action.id)
    );
    const getEditDiff = (key, value1, value2) =>
      value1 !== value2 ? { [key]: value1 } : {};

    return {
      set: {
        ...getEditDiff("assistorName", assistorName, report.assistorName),
        ...getEditDiff("departmentId", departmentId, report.Department.id),
        ...getEditDiff(
          "NumberOfObservers",
          NumberOfObservers,
          report.NumberOfObservers
        ),
      },
      unset: {
        ...(!assistorName && { assistorName: true }),
        ...(!NumberOfObservers && { NumberOfObservers: true }),
      },
      add: {
        actions: newReportActionsIds.filter(
          (id) => !oldReportActionsIds.includes(id)
        ),
        followUpActions: followUpActions.filter(
          (newFollowup) =>
            !report.ReportFollowUpActions.find(
              (oldFollowup) =>
                oldFollowup.User.id === newFollowup.userId &&
                oldFollowup.actionName === newFollowup.actionName
            )
        ),
      },
      remove: {
        actions: removedReportActions.map(({ id }) => id),
        followUpActions: report.ReportFollowUpActions.filter(
          (oldFollowup) =>
            !followUpActions.find(
              (newFollowup) =>
                oldFollowup.User.id === newFollowup.userId &&
                oldFollowup.actionName === newFollowup.actionName
            )
        ).map(({ id }) => id),
      },
    };
  };

  //handling create/edit report
  const onFinish = async ({
    departmentId,
    assistorName,
    followUpActions,
    safeactions,
    unsafeactions,
    NumberOfObservers,
  }) => {
    try {
      setIsSubmitting(true);
      const newReportActionsIds = [...safeactions, ...unsafeactions].map(
        ({ actionId }) => actionId
      );

      const payload = {
        departmentId,
        assistorName,
        areaId: 1,
        NumberOfObservers,
        followUpActions,
        actions: newReportActionsIds,
      };
      const editPayload = getEditPayload(report, payload);

      Boolean(report)
        ? await editReport(id, removeEmptyValues(editPayload))
        : await createReport(payload);

      openNotification({
        title: "Report Created Successfully",
      });
      return navigate("/reports");
    } catch (error) {
      openNotification({
        title: error.message,
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // get all required data for report creation
  useEffect(() => {
    const getDepartments = async () => {
      try {
        const { departments } = await getAllDepartments();
        setDepartments(departments);
      } catch (error) {
        openNotification({
          title: error.message,
          type: "error",
        });
      }
    };

    const getTypeActions = async (type) => {
      try {
        const { actions } = await getAllActions({ type });
        type === SAFE_ACTION
          ? setSafeActions(actions)
          : setUnsafeActions(actions);
      } catch (error) {
        openNotification({
          title: error.message,
          type: "error",
        });
      }
    };

    const getUsers = async () => {
      try {
        const { users: allUsers } = await getAllUsers();
        setUsers(allUsers);
      } catch (error) {
        openNotification({
          title: error.message,
          type: "error",
        });
      }
    };

    getDepartments();
    getTypeActions(SAFE_ACTION);
    getTypeActions(UNSAFE_ACTION);
    getUsers();
  }, [openNotification]);

  //get report data in case of edit
  useEffect(() => {
    const getReportData = async () => {
      try {
        const reportData = await getReportById(id);
        setReport(reportData);

        const getInitialActions = (type) =>
          reportData.ReportActions.reduce((actions, { Action }) => {
            Action.type === type &&
              actions.push({
                actionId: Action.id,
                name: Action.name,
                type: Action.type,
              });
            return actions;
          }, []);

        const initialFollowupActions = reportData.ReportFollowUpActions.map(
          ({ actionName, User }) => {
            return {
              actionName,
              userId: User.id,
            };
          }
        );

        form.setFieldsValue({
          assessor: reportData.creator.fullName,
          assistorName: reportData.assistorName,
          departmentId: reportData.Department.id,
          NumberOfObservers: reportData.NumberOfObservers,
          safeactions: getInitialActions(SAFE_ACTION),
          unsafeactions: getInitialActions(UNSAFE_ACTION),
          followUpActions: initialFollowupActions,
        });
      } catch (error) {
        openNotification({
          title: error.message,
          type: "error",
        });
      }
      setIsLoading(false);
    };

    if (id) {
      getReportData();
    } else {
      form.setFieldsValue({ safeactions: [""] });
      setIsLoading(false);
    }
  }, [id, openNotification, form]);

  return isLoading ? (
    <Spin className="all-page__spinner" />
  ) : (
    <CreateEditLayout
      form={form}
      onFinish={onFinish}
      className="add-edit-report__form"
      onCancelClick={() => navigate("/reports")}
      isLoading={isSubmitting}
    >
      <ReportsFirstSection departments={departments} />

      <ReportsCards title={intl.formatMessage({ id: "reports.safe_acts" })}>
        <ActionsList
          name="safeactions"
          type={SAFE_ACTION}
          placeholder={intl.formatMessage({
            id: "reports.safe_action",
          })}
          ctaLabel={intl.formatMessage({ id: "reports.add_safe_action" })}
          limit={7}
          typeActions={safeActions}
        />
      </ReportsCards>

      <div className="add-edit-report__alert caption">
        {intl.formatMessage({ id: "reports.hsm" })}
      </div>

      <ReportsCards title={intl.formatMessage({ id: "reports.unsafe_acts" })}>
        <ActionsList
          name="unsafeactions"
          type={UNSAFE_ACTION}
          placeholder={intl.formatMessage({
            id: "reports.unsafe_action",
          })}
          ctaLabel={intl.formatMessage({ id: "reports.add_unsafe_action" })}
          limit={7}
          typeActions={unsafeActions}
        />
      </ReportsCards>

      <ReportsCards
        title={intl.formatMessage({ id: "reports.agreed_followups" })}
      >
        <FollowupActionsList
          name="followUpActions"
          placeholder={intl.formatMessage({
            id: "reports.followup_action",
          })}
          ctaLabel={intl.formatMessage({ id: "reports.add_followup_action" })}
          limit={4}
          users={users}
        />
      </ReportsCards>

      <div className="add-edit-report__alert caption">
        {intl.formatMessage({ id: "reports.nmha" })}
      </div>

      {/* <ReportsCards title={intl.formatMessage({ id: "reports.images" })}>
        <ReportsImages />
      </ReportsCards> */}

      <ReportsFooter />
    </CreateEditLayout>
  );
}

export default injectIntl(AddEditReport);
