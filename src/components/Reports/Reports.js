import { useCallback, useContext, useState } from "react";
import { injectIntl } from "react-intl";
import { useNavigate } from "react-router-dom";
import qs from "qs";

import { REPORTS_COLUMNS } from "../../constants/reports";
import { ContextWrapper } from "../../contexts/layout.context";

import TableLayout from "../Layouts/TableLayout/TableLayout";

const getRandomuserParams = (params) => ({
  results: params.pagination?.pageSize,
  page: params.pagination?.current,
  ...params,
});

function Reports({ intl }) {
  const [data, setData] = useState();

  const { openNotification } = useContext(ContextWrapper);
  const navigate = useNavigate();

  const fetchData = useCallback(
    async ({ pageSize, pageNumber, sorter, search }) => {
      try {
        await fetch(
          `https://randomuser.me/api?${qs.stringify(
            getRandomuserParams({
              pagination: {
                current: pageNumber,
                pageSize: pageSize,
              },
            })
          )}`
        )
          .then((res) => res.json())
          .then(({ results }) => {
            setData(results);
          });
        return { count: 200 };
      } catch (error) {
        openNotification({
          title: error.message,
          type: "error",
        });
      }
    },
    [openNotification]
  );

  return (
    <TableLayout
      btnLabel={intl.formatMessage({ id: "reports.create_reports" })}
      onClick={() => navigate("/reports/add")}
      columns={REPORTS_COLUMNS}
      dataSource={data}
      fetchData={fetchData}
      rowKey={(record) => record.login.uuid}
    />
  );
}

export default injectIntl(Reports);
