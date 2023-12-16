import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { DatePicker, Form, Select } from "antd";
import { Column } from "@ant-design/plots";
import dayjs from "dayjs";

import { getRangePickerLocale } from "../../utils/helpers";
import { LayoutContextWrapper } from "../../contexts/layout.context";
import { REPORT_PAGE_TYPES } from "../../constants/actions";
import {
  getReportsByDepartment,
  getReportsByReporter,
} from "../../services/reports";
import { getAllUsers } from "../../services/users";
import { getAllDepartments } from "../../services/departments";

import ASTable from "../ASTable/ASTable";
import ASButton from "../ASButton/ASButton";
import { fmt } from "../IntlWrapper/IntlWrapper";
import ASCollapse from "../ASCollapse/ASCollapse";
import { getLocale } from "../../utils/intl-provider";

function ReportsPerReporter({ pageType }) {
  const [users, setUsers] = useState([]);
  const [departments, setDepartments] = useState([]);

  const tableRef = useRef();

  const [form] = Form.useForm();

  const [data, setData] = useState([]);
  const [analytics, setAnalytics] = useState([]);

  const columns = [
    {
      title: {
        reporter: fmt({
          id: "reports.employee",
        }),
        department: fmt({
          id: "reports.department",
        }),
      }[pageType],
      render: ({ departmentName, departmentNameAr, creatorName }) =>
        pageType === "department"
          ? getLocale() === "en"
            ? departmentName || departmentNameAr
            : departmentNameAr || departmentName
          : creatorName,
    },
    {
      title: fmt({
        id: "reports.number_of_reports",
      }),
      dataIndex: "reportCount",
    },
    {
      title: fmt({
        id: "reports.people_observed",
      }),
      dataIndex: "NumberOfObservers",
    },
  ];

  const config = {
    data: analytics,
    xField: {
      reporter: "creatorName",
      department: "departmentName",
    }[pageType],
    yField: {
      reporter: "reportCount",
      department: "reportCount",
    }[pageType],
    label: { position: "middle" },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: true,
      },
    },
    meta: {
      reportCount: {
        alias: fmt({
          id: "reports.reports_count",
        }),
      },
    },
  };

  const { openNotification } = useContext(LayoutContextWrapper);

  const handleApplyFilter = ({ reportDate, creatorsIds, departmentsIds }) => {
    tableRef.current.refreshTable({
      filters: {
        createdFrom: reportDate?.[0],
        createdTo: reportDate?.[1],
        ...(!!creatorsIds?.length && { creatorsIds: creatorsIds.toString() }),
        ...(!!departmentsIds?.length && {
          departmentsIds: departmentsIds.toString(),
        }),
      },
    });
  };

  const fetchData = useCallback(
    async ({ pageSize, pageNumber, filters }) => {
      const dataApi = {
        reporter: getReportsByReporter,
        department: getReportsByDepartment,
      };

      try {
        const {
          paginatedData: { data, count },
          analyticsData,
        } = await dataApi[pageType]({
          page: pageNumber,
          limit: pageSize,
          ...filters,
        });
        setData(data);
        setAnalytics(analyticsData);
        return { count };
      } catch (error) {
        openNotification({
          title: error.message,
          type: "error",
        });
      }
    },
    [pageType, openNotification]
  );

  useEffect(() => {
    const getDepartments = async () => {
      try {
        const { departments } = await getAllDepartments();
        setDepartments(
          departments.map(({ id, name = "", nameAr = "" }) => ({
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

  return (
    <div className="filtered-reports-page">
      <ASCollapse panelHeader={fmt({ id: "reports.filters" })}>
        <Form form={form} layout="vertical" onFinish={handleApplyFilter}>
          <Form.Item
            name="reportDate"
            label={fmt({ id: "reports.date_period" })}
          >
            <DatePicker.RangePicker
              locale={getRangePickerLocale()}
              disabledDate={(current) => {
                return current && current.isAfter(dayjs().endOf("day"));
              }}
            />
          </Form.Item>
          {pageType === REPORT_PAGE_TYPES.REPORTER && (
            <Form.Item
              name="creatorsIds"
              label={fmt({ id: "reports.reporters" })}
            >
              <Select
                options={users}
                placeholder={fmt({ id: "reports.reporters" })}
                mode="multiple"
                virtual={false}
              />
            </Form.Item>
          )}
          {pageType === REPORT_PAGE_TYPES.DEPARTMENT && (
            <Form.Item
              name="departmentsIds"
              label={fmt({
                id: "header.tabs_name.departments",
              })}
            >
              <Select
                options={departments}
                placeholder={fmt({
                  id: "header.tabs_name.departments",
                })}
                mode="multiple"
                virtual={false}
              />
            </Form.Item>
          )}
          <div style={{ display: "flex", gap: "12px" }}>
            <ASButton label={fmt({ id: "common.filter" })} htmlType="submit" />
            <ASButton
              label={fmt({ id: "common.clear" })}
              onClick={() => {
                form.resetFields();
                tableRef.current.refreshTable({});
              }}
              type="destructive-basic"
            />
          </div>
        </Form>
      </ASCollapse>
      {console.log(pageType)}
      <ASTable
        columns={columns}
        dataSource={data}
        fetchData={fetchData}
        rowKey={({ creatorName, departmentName }) =>
          creatorName || departmentName
        }
        tableRef={tableRef}
      />

      <Column {...config} />
    </div>
  );
}

export default ReportsPerReporter;
