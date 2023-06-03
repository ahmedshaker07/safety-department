import { useEffect, useState } from "react";
import { injectIntl } from "react-intl";
import { Table } from "antd";
import { useNavigate } from "react-router-dom";
import qs from "qs";
import { Input } from "antd";

import { getLocale } from "../../utils/intl-provider";

import ASButton from "../ASButton/ASButton";

import "./Reports.scss";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    sorter: true,
    render: (name) => `${name.first} ${name.last}`,
    width: "20%"
  },
  {
    title: "Gender",
    dataIndex: "gender",
    sorter: true,
    width: "20%"
  },
  {
    title: "Email",
    sorter: true,
    dataIndex: "email"
  }
];

const getRandomuserParams = (params) => ({
  results: params.pagination?.pageSize,
  page: params.pagination?.current,
  ...params
});

function Reports({ intl }) {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10
    }
  });
  const [searchText, setSearchText] = useState("");

  const tableParamsStringfied = JSON.stringify(tableParams);

  const navigate = useNavigate();

  const fetchData = () => {
    setLoading(true);
    fetch(
      `https://randomuser.me/api?${qs.stringify(
        getRandomuserParams(tableParams)
      )}`
    )
      .then((res) => res.json())
      .then(({ results }) => {
        setData(results);
        setLoading(false);
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: 200
            // 200 is mock data, you should read it from server
            // total: data.totalCount,
          }
        });
      });
  };

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter
    });

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };

  const onSearchTextChange = ({ target }) => {
    setSearchText(target.value);
  };

  const onSearchClick = () => {
    if (searchText) {
      fetchData();
      setSearchText("");
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [tableParamsStringfied]);

  return (
    <div className="reports-page">
      <div className="reports-page__add-report">
        <ASButton
          label={intl.formatMessage({ id: "reports.create_reports" })}
          onClick={() => navigate("/reports/add")}
        />
      </div>
      <Table
        bordered
        className="reports-page__table"
        columns={columns}
        rowKey={(record) => record.login.uuid}
        dataSource={data}
        pagination={tableParams.pagination}
        loading={loading}
        onChange={handleTableChange}
        locale={getLocale()}
        title={() => (
          <>
            <Input
              placeholder="Search"
              value={searchText}
              onChange={onSearchTextChange}
            />
            <ASButton label="Search" onClick={onSearchClick} />
          </>
        )}
      />
    </div>
  );
}

export default injectIntl(Reports);
