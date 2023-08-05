import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Select, Form, DatePicker, Collapse } from "antd";
import ArabicLocale from "antd/es/date-picker/locale/ar_EG";
import FrenchLocale from "antd/es/date-picker/locale/fr_FR";
import { Pie } from "@ant-design/plots";

import { LayoutContextWrapper } from "../../contexts/layout.context";
import { getAllReports } from "../../services/reports";
import { fmt } from "../IntlWrapper/IntlWrapper";
import { checkSmartDate, getRangePickerLocale } from "../../utils/helpers";
import { getLocale } from "../../utils/intl-provider";
import { getAllDepartments } from "../../services/departments";
import { getAllUsers } from "../../services/users";

import ASButton from "../ASButton/ASButton";
import TableLayout from "../Layouts/TableLayout/TableLayout";

import "./Followup.scss";

function Followup() {
  const [actions, setActions] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [users, setUsers] = useState([]);

  const { openNotification } = useContext(LayoutContextWrapper);

  const tableRef = useRef();

  const datePickerLocale = {
    ar: ArabicLocale,
    fr: FrenchLocale,
    en: null,
  };

  const data = [
    { type: "Done", value: 27 },
    { type: "Suspended", value: 25 },
  ];

  const config = {
    data,
    angleField: "value",
    colorField: "type",
    label: {
      type: "spider",
      labelHeight: 28,
      content: "{name}\n{percentage}",
    },
    legend: false,
    interactions: [
      {
        type: "element-selected",
      },
      {
        type: "element-active",
      },
    ],
  };

  const FOLLOWUP_COLUMNS = [
    {
      title: "Ref ID",
      dataIndex: "id",
      width: 100,
    },
    {
      title: fmt({
        id: "reports.date",
      }),
      dataIndex: "createdAt",
      render: ({ createdAt }) => checkSmartDate(createdAt),
    },
    {
      title: fmt({
        id: "header.tabs_name.departments",
      }),
      dataIndex: "Department",
      render: ({ name }) => name,
    },
    {
      title: "By Whom",
      render: () => <span>Ahmed Sayed</span>,
    },
    {
      title: "Deadline",
      render: () => (
        <div onClick={(event) => event.stopPropagation()}>
          <DatePicker
            locale={datePickerLocale[getLocale()]}
            onChange={(date) => {
              console.log(date);
            }}
            getPopupContainer={() => document.body}
          />
        </div>
      ),
      width: 200,
    },
    {
      title: "Status",
      render: () => (
        <div
          className="checkbox-wrapper-10"
          onClick={(event) => event.stopPropagation()}
        >
          <input
            defaultChecked={true}
            type="checkbox"
            id="cb5"
            className="tgl tgl-flip"
          />
          <label
            htmlFor="cb5"
            data-tg-on="Done"
            data-tg-off="Suspended"
            className="tgl-btn"
          />
        </div>
      ),
      width: 130,
    },
  ];

  const fetchData = useCallback(
    async ({ pageSize, pageNumber, search }) => {
      try {
        const data = await getAllReports({
          page: pageNumber,
          limit: pageSize,
        });
        setActions(data);
        return { count: 10 };
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

  return (
    <div className="followups">
      <Collapse className="followups__filters">
        <Collapse.Panel header="Filters">
          <Form layout="vertical">
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
                  { value: "done", label: "Done" },
                  { value: "suspended", label: "Suspended" },
                ]}
                placeholder="Status"
              />
            </Form.Item>
            <ASButton label={fmt({ id: "common.filter" })} />
          </Form>
        </Collapse.Panel>
      </Collapse>

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
