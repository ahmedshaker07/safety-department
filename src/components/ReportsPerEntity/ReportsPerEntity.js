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
        reporter: "Employee",
        department: "Department",
      }[pageType],
      dataIndex: {
        reporter: "creatorName",
        department: "departmentName",
      }[pageType],
    },
    { title: "Number of reports", dataIndex: "reportCount" },
    { title: "People observed", dataIndex: "NumberOfObservers" },
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
        alias: "Reports Count",
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
    <div className="filtered-reports-page">
      <ASCollapse panelHeader="Filters">
        <Form form={form} layout="vertical" onFinish={handleApplyFilter}>
          <Form.Item name="reportDate" label="Date Period">
            <DatePicker.RangePicker
              locale={getRangePickerLocale()}
              disabledDate={(current) => {
                return current && current.isAfter(dayjs().endOf("day"));
              }}
            />
          </Form.Item>
          {pageType === REPORT_PAGE_TYPES.REPORTER && (
            <Form.Item name="creatorsIds" label="Reporters">
              <Select options={users} placeholder="Reporters" mode="multiple" />
            </Form.Item>
          )}
          {pageType === REPORT_PAGE_TYPES.DEPARTMENT && (
            <Form.Item name="departmentsIds" label="Departments">
              <Select
                options={departments}
                placeholder="Departments"
                mode="multiple"
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

      <ASTable
        columns={columns}
        dataSource={data}
        fetchData={fetchData}
        rowKey={({ id }) => id}
        // hasExportFeatures
        tableRef={tableRef}
      />

      <Column {...config} />
    </div>
  );
}

export default ReportsPerReporter;
