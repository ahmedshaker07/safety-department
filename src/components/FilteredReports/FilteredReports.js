import { useCallback, useContext, useState } from "react";
import { DatePicker, Form, Tabs } from "antd";

import { getRangePickerLocale } from "../../utils/helpers";
import { LayoutContextWrapper } from "../../contexts/layout.context";

import FilteredReportsColumn from "./components/FilteredReportsColumn";
import ASButton from "../ASButton/ASButton";
import ASTable from "../ASTable/ASTable";
import { fmt } from "../IntlWrapper/IntlWrapper";
import ASCollapse from "../ASCollapse/ASCollapse";

import "./FilteredReports.scss";
import { REPORT_PAGE_TYPES } from "../../constants/actions";

function FilteredReports({ pageType }) {
  const columns = [
    {
      title: {
        time: "Date",
        reporter: "Employee",
        department: "Department",
      }[pageType],
      dataIndex: {
        time: "date",
        reporter: "name",
        department: "name",
      }[pageType],
    },
    {
      title: "Number of reports",
      dataIndex: "numberOfReports",
    },
    {
      title: "People observed",
      dataIndex: "peopleObserved",
    },
  ];

  const [data, setData] = useState([
    {
      id: 1,
      name: "Michela Morin",
      numberOfReports: 45,
      peopleObserved: 102,
      date: "12-11-96",
    },
    {
      id: 2,
      name: "José Gómez",
      numberOfReports: 41,
      peopleObserved: 115,
      date: "12-11-96",
    },
    {
      id: 3,
      name: "Stella Stone",
      numberOfReports: 33,
      peopleObserved: 85,
      date: "12-11-96",
    },
    {
      id: 4,
      name: "Alma Alvarez",
      numberOfReports: 50,
      peopleObserved: 90,
      date: "12-11-96",
    },
  ]);

  const { openNotification } = useContext(LayoutContextWrapper);

  const fetchData = useCallback(
    async ({ pageSize, pageNumber, sorter, search }) => {
      try {
        setData((oldData) => {
          return oldData;
        });
        return { count: 4 };
      } catch (error) {
        openNotification({
          title: error.message,
          type: "error",
        });
      }
    },
    [openNotification]
  );

  const ReportsPerPeriod = () => {
    return (
      <div className="filtered-reports-page">
        <ASCollapse panelHeader="Filters">
          <Form layout="vertical">
            <Form.Item name="reportDate" label="Date Period">
              <DatePicker.RangePicker locale={getRangePickerLocale()} />
            </Form.Item>

            <ASButton label={fmt({ id: "common.filter" })} />
          </Form>
        </ASCollapse>

        <ASTable
          columns={columns}
          dataSource={data}
          fetchData={fetchData}
          rowKey={({ id }) => id}
          hasExportFeatures
          hasSearch={[
            REPORT_PAGE_TYPES.REPORTER,
            REPORT_PAGE_TYPES.DEPARTMENT,
          ].includes(pageType)}
        />

        <FilteredReportsColumn />
      </div>
    );
  };

  return (
    <Tabs
      defaultActiveKey="Per Day"
      type="card"
      animated
      items={[
        {
          name: "Per Day",
          component: ReportsPerPeriod,
        },
        {
          name: "Per Week",
          component: ReportsPerPeriod,
        },
        {
          name: "Per Month",
          component: ReportsPerPeriod,
        },
        {
          name: "Per Year",
          component: ReportsPerPeriod,
        },
      ].map(({ name, component: Component }, idx) => {
        return {
          label: name,
          key: idx,
          children: <Component />,
        };
      })}
    />
  );
}

export default FilteredReports;
