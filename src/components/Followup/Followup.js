import { useCallback, useContext, useRef, useState } from "react";
import { injectIntl } from "react-intl";
import { useNavigate } from "react-router-dom";

import { LayoutContextWrapper } from "../../contexts/layout.context";
import { getAllReports } from "../../services/reports";
import { fmt } from "../IntlWrapper/IntlWrapper";
import { checkSmartDate } from "../../utils/helpers";

import TableLayout from "../Layouts/TableLayout/TableLayout";

import "./Followup.scss";

function Followup({ intl }) {
  const [data, setData] = useState([]);

  const { openNotification } = useContext(LayoutContextWrapper);

  const navigate = useNavigate();

  const tableRef = useRef();

  const REPORTS_COLUMNS = [
    {
      title: "Ref ID",
      dataIndex: "id",
      width: 100,
    },
    {
      title: fmt({
        id: "reports.date",
      }),
      dataIndex: "createdAt",
      render: ({ createdAt }) => checkSmartDate(createdAt),
    },
    {
      title: fmt({
        id: "header.tabs_name.departments",
      }),
      dataIndex: "Department",
      render: ({ name }) => name,
    },
  ];

  const fetchData = useCallback(
    async ({ pageSize, pageNumber, search }) => {
      try {
        const data = await getAllReports({
          page: pageNumber,
          limit: pageSize,
        });
        setData(data);
        return { count: 10 };
      } catch (error) {
        openNotification({
          title: error.message,
          type: "error",
        });
        return { count: 0 };
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
      rowKey={(record) => record.id}
      tableRef={tableRef}
      onRowClick={({ data: { id } }) => navigate(`/reports/${id}`)}
    />
  );
}

export default injectIntl(Followup);
