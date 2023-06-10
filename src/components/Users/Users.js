import { useCallback, useContext, useState } from "react";
import { injectIntl } from "react-intl";
import { useNavigate } from "react-router-dom";
import qs from "qs";

import { USERS_COLUMNS } from "../../constants/users";
import { ContextWrapper } from "../../contexts/layout.context";

import TableLayout from "../Layouts/TableLayout/TableLayout";

const getRandomuserParams = (params) => ({
  results: params.pagination?.pageSize,
  page: params.pagination?.current,
  ...params,
});

function Users({ intl }) {
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
      btnLabel={intl.formatMessage({ id: "users.create_user" })}
      onClick={() => navigate("/users/add")}
      columns={USERS_COLUMNS}
      dataSource={data}
      fetchData={fetchData}
      rowKey={(record) => record.login.uuid}
    />
  );
}

export default injectIntl(Users);
