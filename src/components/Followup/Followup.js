import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Select, Form, DatePicker, Tooltip, Input } from "antd";
import ArabicLocale from "antd/es/date-picker/locale/ar_EG";
import FrenchLocale from "antd/es/date-picker/locale/fr_FR";
import { Pie } from "@ant-design/plots";
import dayjs from "dayjs";

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

  const tableRef = useRef();

  const [form] = Form.useForm();

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
        set: {
          deadLine: dayjs(date).toISOString(),
        },
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
    { type: "Done", value: analyticsData?.doneTasks },
    {
      type: "In Progress",
      value: analyticsData?.totalTasks - analyticsData?.doneTasks,
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
      title: "Action ID",
      width: 100,
      dataIndex: "id",
      render: (id) => id,
    },
    {
      title: "Report ID",
      dataIndex: "Report",
      width: 100,
      render: ({ id }) => id,
    },
    {
      title: "Action Name",
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
      render: ({ Department }) => Department?.name,
    },
    {
      title: "By Whom",
      dataIndex: "User",
      render: ({ fullName }) => fullName,
    },
    {
      title: "Deadline",
      render: ({ id, deadLine, userId }) => (
        <div onClick={(event) => event.stopPropagation()}>
          <DatePicker
            locale={datePickerLocale[getLocale()]}
            onChange={(date) => onDateChange(id, date)}
            getPopupContainer={() => document.body}
            allowClear={false}
            inputReadOnly
            disabledDate={(current) => disabledDate(current, new Date())}
            defaultValue={deadLine ? dayjs(deadLine) : null}
            disabled={userData.id !== userId}
          />
        </div>
      ),
      width: 200,
    },
    ...(permissions.UPDATE_FOLLOWUP_STATUS
      ? [
          {
            title: "Status",
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
                  data-tg-on="Done"
                  data-tg-off="In Progress"
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
  }) => {
    const payload = {
      state: status,
      departmentId,
      createdFrom: reportDate?.[0],
      createdTo: reportDate?.[1],
      deadLineFrom: deadline?.[0],
      deadLineTo: deadline?.[1],
      reportId,
      referenceId: actionId,
    };

    tableRef.current.refreshTable({ filters: payload });
    getAnalytics(payload);
  };

  useEffect(() => {
    const getDepartments = async () => {
      try {
        const { departments } = await getAllDepartments();
        setDepartments(
          departments.map(({ id, name }) => ({
            value: id,
            label: name,
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
    getAnalytics();
  }, [getAnalytics]);

  return (
    <div className="followups">
      <ASCollapse panelHeader="Filters">
        <Form form={form} layout="vertical" onFinish={handleFilterSubmit}>
          <div className="followups__date-filters">
            <Form.Item name="reportDate" label="Report Date">
              <DatePicker.RangePicker locale={getRangePickerLocale()} />
            </Form.Item>
            <Form.Item name="deadline" label="Deadline">
              <DatePicker.RangePicker locale={getRangePickerLocale()} />
            </Form.Item>
          </div>
          <Form.Item name="departmentId" label={fmt({ id: "reports.area" })}>
            <Select
              placeholder={fmt({ id: "reports.area" })}
              options={departments}
              virtual={false}
            />
          </Form.Item>
          <Form.Item
            name="name"
            label={fmt({
              id: "reports.by_whom",
            })}
          >
            <Select
              options={users}
              placeholder={fmt({
                id: "reports.by_whom",
              })}
            />
          </Form.Item>
          <Form.Item name="status" label="Status">
            <Select
              options={[
                { value: "DONE", label: "Done" },
                { value: "inProgress", label: "In Progress" },
              ]}
              placeholder="Status"
            />
          </Form.Item>
          <div className="followups__date-filters">
            <Form.Item name="reportId" label="Report ID">
              <Input placeholder="Report ID" />
            </Form.Item>
            <Form.Item name="actionId" label="Action ID">
              <Input placeholder="Action ID" />
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
      />

      <Pie {...config} />
    </div>
  );
}

export default Followup;
