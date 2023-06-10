import { useCallback, useContext, useState } from "react";
import { injectIntl } from "react-intl";
import { DatePicker, Form } from "antd";

import { getRangePickerLocale } from "../../utils/helpers";
import { ContextWrapper } from "../../contexts/layout.context";

import FilteredReportsColumn from "./components/FilteredReportsColumn";
import ASButton from "../ASButton/ASButton";
import ASTable from "../ASTable/ASTable";

import "./FilteredReports.scss";

const { RangePicker } = DatePicker;

function FilteredReports({ intl, pageType }) {
  const columns = [
    {
      title: pageType === "reporter" ? "Employee" : "Date",
      dataIndex: pageType === "reporter" ? "name" : "date",
      sorter: true,
    },
    {
      title: "Number of reports",
      dataIndex: "numberOfReports",
      sorter: true,
    },
    {
      title: "People observed",
      sorter: true,
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

  const { openNotification } = useContext(ContextWrapper);

  const fetchData = useCallback(
    async ({ pageSize, pageNumber, sorter, search }) => {
      try {
        setData((oldData) => {
          return oldData;
        });
        return { count: 4 };
      } catch (error) {
        openNotification({
          title: error,
          type: "error",
        });
      }
    },
    [openNotification]
  );

  return (
    <div className="filtered-reports-page">
      <div className="filtered-reports__filters">
        <div>
          <Form.Item>
            <RangePicker locale={getRangePickerLocale()} />
          </Form.Item>
        </div>
        <ASButton label={intl.formatMessage({ id: "common.filter" })} />
      </div>

      <ASTable
        columns={columns}
        dataSource={data}
        fetchData={fetchData}
        rowKey={(record) => record.id}
        hasExportFeatures
      />

      <FilteredReportsColumn />
    </div>
  );
}

export default injectIntl(FilteredReports);
