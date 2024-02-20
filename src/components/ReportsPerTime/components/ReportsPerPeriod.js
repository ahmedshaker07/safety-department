import { useCallback, useContext, useState, useRef } from "react";
import { DatePicker, Form } from "antd";
import { Line } from "@ant-design/plots";

import { checkSmartDate, getRangePickerLocale } from "../../../utils/helpers";
import { getReportsByTime } from "../../../services/reports";
import { LayoutContextWrapper } from "../../../contexts/layout.context";

import ASCollapse from "../../ASCollapse/ASCollapse";
import ASButton from "../../ASButton/ASButton";
import { fmt } from "../../IntlWrapper/IntlWrapper";
import ASTable from "../../ASTable/ASTable";

const ReportsPerPeriod = ({ groupBy }) => {
  const [data, setData] = useState([]);
  const [analyticsData, setAnalyticsData] = useState([]);

  const { openNotification } = useContext(LayoutContextWrapper);

  const tableRef = useRef();

  const [form] = Form.useForm();
  const reportDate = Form.useWatch("reportDate", form);

  const columns = [
    {
      title: fmt({
        id: "reports.date",
      }),
      dataIndex: "timeUnit",
      render: (date) =>
        checkSmartDate(
          date,
          {
            day: "ddd, DD MMM YY",
            week: "DD MMM YY",
            month: "MMM, YYYY",
            year: "YYYY",
          }[groupBy]
        ),
    },
    {
      title: fmt({
        id: "reports.number_of_reports",
      }),
      dataIndex: "totalReports",
    },
    {
      title: fmt({
        id: "reports.people_observed",
      }),
      dataIndex: "totalPeopleObserved",
      render: (totalPeopleObserved) => totalPeopleObserved || "_",
    },
  ];

  const config = {
    data: analyticsData,
    xField: "timeUnit",
    yField: "totalReports",
    slider: {
      start: 0.25,
      end: 1,
    },
    meta: {
      totalReports: {
        alias: fmt({
          id: "reports.reports_count",
        }),
      },
    },
  };

  const fetchData = useCallback(
    async ({ pageSize, pageNumber }) => {
      try {
        const {
          paginatedData: { data: paginatedData, count },
          analyticsData: newAnalyticsData,
        } = await getReportsByTime({
          page: pageNumber,
          limit: pageSize,
          groupBy,
          createdFrom: reportDate?.[0],
          createdTo: reportDate?.[1],
        });
        setData(paginatedData);
        setAnalyticsData(newAnalyticsData);
        return { count };
      } catch (error) {
        openNotification({
          title: error.message,
          type: "error",
        });
        return { count: 0 };
      }
    },
    [openNotification, groupBy, reportDate]
  );

  return (
    <div className="filtered-reports-page">
      <ASCollapse panelHeader={fmt({ id: "reports.filters" })}>
        <Form form={form} layout="vertical">
          <Form.Item
            name="reportDate"
            label={fmt({ id: "reports.date_period" })}
          >
            <DatePicker.RangePicker locale={getRangePickerLocale()} />
          </Form.Item>

          <div
            style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}
          >
            <ASButton
              label={fmt({ id: "common.clear" })}
              onClick={() => {
                form.resetFields();
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
        rowKey={({ timeUnit }) => timeUnit}
        tableRef={tableRef}
      />

      <Line {...config} />
    </div>
  );
};

export default ReportsPerPeriod;
