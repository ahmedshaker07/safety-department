import { useCallback, useContext, useState } from "react";
import { injectIntl } from "react-intl";
import { useNavigate } from "react-router-dom";
import qs from "qs";

import { REPORTS_COLUMNS } from "../../constants/reports";
import { ContextWrapper } from "../../contexts/layout.context";

import ASButton from "../ASButton/ASButton";
import ASTable from "../ASTable/ASTable";

import "./Reports.scss";

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
          title: error,
          type: "error",
        });
      }
    },
    [openNotification]
  );

  return (
    <div className="reports-page">
      <div className="reports-page__add-report">
        <ASButton
          label={intl.formatMessage({ id: "reports.create_reports" })}
          onClick={() => navigate("/reports/add")}
        />
      </div>
      <ASTable
        columns={REPORTS_COLUMNS}
        dataSource={data}
        fetchData={fetchData}
        rowKey={(record) => record.login.uuid}
      />
    </div>
  );
}

export default injectIntl(Reports);
