import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Select, Form, DatePicker, Tooltip, Input } from "antd";
import ArabicLocale from "antd/es/date-picker/locale/ar_EG";
import FrenchLocale from "antd/es/date-picker/locale/fr_FR";
import { Pie } from "@ant-design/plots";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

import { LayoutContextWrapper } from "../../contexts/layout.context";
import { fmt } from "../IntlWrapper/IntlWrapper";
import {
  checkSmartDate,
  disabledDate,
  getRangePickerLocale,
} from "../../utils/helpers";
import { getLocale } from "../../utils/intl-provider";
import { getAllDepartments } from "../../services/departments";
import { getAllUsers } from "../../services/users";
import {
  editFollowupAction,
  getFollowupActions,
  getFollowupAnalytics,
} from "../../services/actions";
import { FOLLOWUP_STATES } from "../../constants/actions";
import { ContextWrapper } from "../../contexts/user.context";

import ASButton from "../ASButton/ASButton";
import TableLayout from "../Layouts/TableLayout/TableLayout";
import ASCollapse from "../ASCollapse/ASCollapse";

import "./Followup.scss";

function Followup() {
  const [actions, setActions] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [users, setUsers] = useState([]);
  const [analyticsData, setAnalyticsData] = useState({});

  const { openNotification } = useContext(LayoutContextWrapper);
  const { userData, permissions } = useContext(ContextWrapper);

  const navigate = useNavigate();

  const tableRef = useRef();

  const [form] = Form.useForm();
  const actionId = Form.useWatch("actionId", form);
  const status = Form.useWatch("status", form);

  const onStatusClick = (id, state) => {
    return async () => {
      try {
        await editFollowupAction(id, {
          set: {
            state:
              state === FOLLOWUP_STATES.DONE
                ? FOLLOWUP_STATES.IN_PROGRESS
                : FOLLOWUP_STATES.DONE,
          },
        });
      } catch (error) {
        openNotification({
          title: error.message,
          type: "error",
        });
      }
    };
  };

  const onDateChange = async (id, date) => {
    try {
      await editFollowupAction(id, {
        set: { deadLine: dayjs(date).toISOString() },
      });
    } catch (error) {
      openNotification({
        title: error.message,
        type: "error",
      });
    }
  };

  const datePickerLocale = {
    ar: ArabicLocale,
    fr: FrenchLocale,
    en: null,
  };

  const data = [
    { type: "Done", value: analyticsData?.doneTasks || 0 },
    {
      type: "In Progress",
      value: analyticsData?.totalTasks - analyticsData?.doneTasks || 0,
    },
  ];

  const config = {
    data,
    appendPadding: 10,
    angleField: "value",
    colorField: "type",
    radius: 0.9,
    label: {
      type: "inner",
      offset: "-30%",
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: "center",
      },
    },
    interactions: [
      {
        type: "element-active",
      },
    ],
    legend: false,
    pieStyle: ({ type }) => {
      if (type === "Done") {
        return {
          fill: "#7FC6A6",
        };
      }

      return {
        fill: "#FF3A19",
      };
    },
  };

  const FOLLOWUP_COLUMNS = [
    {
      title: fmt({ id: "actions.followups.action_id" }),
      width: 100,
      dataIndex: "id",
      render: (id) => id,
    },
    {
      title: fmt({ id: "actions.followups.report_id" }),
      dataIndex: "Report",
      width: 100,
      render: ({ id }) => id,
    },
    {
      title: fmt({ id: "actions.followups.action_name" }),
      width: 140,
      dataIndex: "actionName",
      render: (actionName) => (
        <Tooltip title={actionName} className="followup__action-name-tooltip">
          {actionName}
        </Tooltip>
      ),
    },
    {
      title: fmt({
        id: "reports.date",
      }),
      dataIndex: "createdAt",
      render: (createdAt) => checkSmartDate(createdAt),
    },
    {
      title: fmt({
        id: "header.tabs_name.departments",
      }),
      dataIndex: "Report",
      render: ({ Department }) =>
        getLocale() === "en"
          ? Department?.name || Department?.nameAr
          : Department?.nameAr || Department?.name,
    },
    {
      title: fmt({
        id: "reports.by_whom",
      }),
      dataIndex: "User",
      render: ({ fullName }) => fullName,
    },
    {
      title: fmt({ id: "actions.followups.deadline" }),
      render: ({ id, deadLine }) => (
        <div onClick={(event) => event.stopPropagation()}>
          <DatePicker
            locale={datePickerLocale[getLocale()]}
            onChange={(date) => onDateChange(id, date)}
            getPopupContainer={() => document.body}
            allowClear={false}
            inputReadOnly
            disabledDate={(current) => disabledDate(current, new Date())}
            defaultValue={deadLine ? dayjs(deadLine) : null}
          />
        </div>
      ),
      width: 200,
    },
    ...(permissions.UPDATE_FOLLOWUP_STATUS
      ? [
          {
            title: fmt({ id: "actions.followups.status" }),
            render: ({ id, state }) => (
              <div
                className="checkbox-wrapper-10"
                onClick={(event) => event.stopPropagation()}
              >
                <input
                  defaultChecked={state === FOLLOWUP_STATES.DONE}
                  type="checkbox"
                  id={`cb${id}`}
                  className="tgl tgl-flip"
                  onClick={onStatusClick(id, state)}
                />
                <label
                  htmlFor={`cb${id}`}
                  data-tg-on={fmt({ id: "common.done" })}
                  data-tg-off={fmt({ id: "common.in_progress" })}
                  className="tgl-btn"
                />
              </div>
            ),
            width: 130,
          },
        ]
      : []),
  ];

  const fetchData = useCallback(
    async ({ pageSize, pageNumber, search, filters }) => {
      try {
        const { actions, count } = await getFollowupActions({
          page: pageNumber,
          limit: pageSize,
          ...(search && {
            reportId: search,
          }),
          ...filters,
        });
        setActions(actions);
        return { count };
      } catch (error) {
        openNotification({
          title: error.message,
          type: "error",
        });
        return { count: 0 };
      }
    },
    [openNotification]
  );

  const getAnalytics = useCallback(
    async (payload = {}) => {
      try {
        const data = await getFollowupAnalytics(payload);
        setAnalyticsData(data);
      } catch (error) {
        openNotification({
          title: error.message,
          type: "error",
        });
      }
    },
    [openNotification]
  );

  const handleFilterSubmit = ({
    status,
    departmentId,
    reportDate,
    deadline,
    reportId,
    actionId,
    byWhomId,
  }) => {
    tableRef.current.refreshTable({
      filters: {
        state: status,
        departmentId,
        createdFrom: reportDate?.[0],
        createdTo: reportDate?.[1],
        deadLineFrom: deadline?.[0],
        deadLineTo: deadline?.[1],
        ...(reportId && { reportId }),
        ...(actionId && { referenceId: actionId }),
        byWhomId,
      },
    });
    getAnalytics({
      departmentId,
      createdFrom: reportDate?.[0],
      createdTo: reportDate?.[1],
      deadLineFrom: deadline?.[0],
      deadLineTo: deadline?.[1],
      ...(reportId && { reportId }),
      byWhomId,
    });
  };

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  useEffect(() => {
    const getDepartments = async () => {
      try {
        const { departments } = await getAllDepartments();
        setDepartments(
          departments.map(({ id, name, nameAr }) => ({
            value: id,
            label: getLocale() === "en" ? name || nameAr : nameAr || name,
          }))
        );
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
        setUsers(
          allUsers.map(({ id, fullName }) => ({
            value: id,
            label: fullName,
          }))
        );
      } catch (error) {
        openNotification({
          title: error.message,
          type: "error",
        });
      }
    };

    getDepartments();
    getUsers();
  }, [openNotification]);

  useEffect(() => {
    userData?.role === "ADMIN" && getAnalytics();
  }, [userData?.role, getAnalytics]);

  return (
    <div className="followups">
      <ASCollapse panelHeader={fmt({ id: "reports.filters" })}>
        <Form form={form} layout="vertical" onFinish={handleFilterSubmit}>
          <div className="followups__date-filters">
            <Form.Item
              name="reportDate"
              label={fmt({ id: "actions.followups.report_date" })}
            >
              <DatePicker.RangePicker locale={getRangePickerLocale()} />
            </Form.Item>
            <Form.Item
              name="deadline"
              label={fmt({ id: "actions.followups.deadline" })}
            >
              <DatePicker.RangePicker locale={getRangePickerLocale()} />
            </Form.Item>
          </div>
          <Form.Item name="departmentId" label={fmt({ id: "reports.area" })}>
            <Select
              showSearch
              optionFilterProp="children"
              filterOption={filterOption}
              placeholder={fmt({ id: "reports.area" })}
              options={departments}
              virtual={false}
            />
          </Form.Item>
          <Form.Item
            name="byWhomId"
            label={fmt({
              id: "reports.by_whom",
            })}
          >
            <Select
              showSearch
              optionFilterProp="children"
              filterOption={filterOption}
              virtual={false}
              options={users}
              placeholder={fmt({
                id: "reports.by_whom",
              })}
            />
          </Form.Item>
          <Form.Item
            name="status"
            label={fmt({ id: "actions.followups.status" })}
          >
            <Select
              options={[
                { value: "DONE", label: fmt({ id: "common.done" }) },
                {
                  value: "inProgress",
                  label: fmt({ id: "common.in_progress" }),
                },
              ]}
              placeholder={fmt({ id: "actions.followups.status" })}
            />
          </Form.Item>
          <div className="followups__date-filters">
            <Form.Item
              name="reportId"
              label={fmt({ id: "actions.followups.report_id" })}
            >
              <Input placeholder={fmt({ id: "actions.followups.report_id" })} />
            </Form.Item>
            <Form.Item
              name="actionId"
              label={fmt({ id: "actions.followups.action_id" })}
            >
              <Input placeholder={fmt({ id: "actions.followups.action_id" })} />
            </Form.Item>
          </div>
          <div className="followup__filter-actions">
            <ASButton label={fmt({ id: "common.filter" })} htmlType="submit" />
            <ASButton
              label={fmt({ id: "common.clear" })}
              onClick={() => {
                form.resetFields();
                tableRef.current.refreshTable({});
                getAnalytics();
              }}
              type="destructive-basic"
            />
          </div>
        </Form>
      </ASCollapse>

      <TableLayout
        columns={FOLLOWUP_COLUMNS}
        dataSource={actions}
        fetchData={fetchData}
        rowKey={({ id }) => id}
        tableRef={tableRef}
        onRowClick={({ data: { reportId } }) => {
          navigate(`/reports/${reportId}`);
        }}
      />
      {!actionId && !status && userData.role === "ADMIN" && <Pie {...config} />}
    </div>
  );
}

export default Followup;
