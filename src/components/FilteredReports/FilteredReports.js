import { useState } from "react";
import { injectIntl } from "react-intl";
import { Input, Table, DatePicker, Form } from "antd";

import { getRangePickerLocale } from "../../utils/helpers";

import FilteredReportsColumn from "./components/FilteredReportsColumn";
import ASButton from "../ASButton/ASButton";

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
  const [searchText, setSearchText] = useState("");
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const onSearchClick = () => {
    if (searchText) {
      setSearchText("");
    }
  };

  const onSearchTextChange = ({ target }) => {
    setSearchText(target.value);
  };

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };

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

      <Table
        bordered
        className="filtered-reports-page__table"
        columns={columns}
        rowKey={(record) => record.id}
        dataSource={data}
        pagination={tableParams.pagination}
        loading={false}
        onChange={handleTableChange}
        title={() => (
          <>
            <div className="filtered-reports-page__table-actions">
              <ASButton label="PDF" />
              <ASButton label="Excel" />
            </div>
            <div className="filtered-reports-page__table-search">
              <Input
                placeholder={intl.formatMessage({ id: "common.search" })}
                value={searchText}
                onChange={onSearchTextChange}
              />
              <ASButton
                label={intl.formatMessage({ id: "common.search" })}
                onClick={onSearchClick}
              />
            </div>
          </>
        )}
      />

      <FilteredReportsColumn />
    </div>
  );
}

export default injectIntl(FilteredReports);
