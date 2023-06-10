import { useCallback, useContext, useState } from "react";
import { injectIntl } from "react-intl";
import { useNavigate } from "react-router-dom";
import qs from "qs";

import { ACTIONS_COLUMNS } from "../../constants/actions";
import { ContextWrapper } from "../../contexts/layout.context";

import TableLayout from "../Layouts/TableLayout/TableLayout";

const getRandomuserParams = (params) => ({
  results: params.pagination?.pageSize,
  page: params.pagination?.current,
  ...params,
});

function Actions({ intl }) {
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
        return { count: 10 };
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
    <TableLayout
      btnLabel={intl.formatMessage({ id: "actions.create_action" })}
      onClick={() => navigate("/actions/add")}
      columns={ACTIONS_COLUMNS}
      dataSource={data}
      fetchData={fetchData}
      rowKey={(record) => record.login.uuid}
    />
  );
}

export default injectIntl(Actions);