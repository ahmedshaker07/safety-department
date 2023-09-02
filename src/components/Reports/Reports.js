import { useCallback, useContext, useRef, useState } from "react";
import { injectIntl } from "react-intl";
import { useNavigate } from "react-router-dom";
import {
  DeleteOutlined,
  EditOutlined,
  FilePdfOutlined,
} from "@ant-design/icons";

import { LayoutContextWrapper } from "../../contexts/layout.context";
import { deleteReport, getAllReports } from "../../services/reports";
import { fmt } from "../IntlWrapper/IntlWrapper";
import { checkSmartDate } from "../../utils/helpers";

import TableLayout from "../Layouts/TableLayout/TableLayout";

import "./Reports.scss";

function Reports({ intl }) {
  const [data, setData] = useState([]);

  const { openNotification } = useContext(LayoutContextWrapper);

  const navigate = useNavigate();

  const tableRef = useRef();

  const REPORTS_COLUMNS = [
    {
      title: "ID",
      dataIndex: "id",
      width: 20,
    },
    {
      title: fmt({ id: "reports.assessor" }),
      dataIndex: "creator",
      render: (creator) => `${creator.fullName}`,
    },
    {
      title: fmt({ id: "reports.assited" }),
      dataIndex: "assistorName",
      render: (assistorName) => assistorName || "_",
    },
    {
      title: fmt({
        id: "header.tabs_name.departments",
      }),
      dataIndex: "Department",
      render: (department) => department?.name,
    },
    {
      title: fmt({
        id: "reports.date",
      }),
      dataIndex: "createdAt",
      render: (createdAt) => checkSmartDate(createdAt),
    },
    {
      render: ({ id }) => (
        <div className="reports-actions" onClick={(e) => e.stopPropagation()}>
          <FilePdfOutlined className="ant-icon-md" />
          <EditOutlined
            className="ant-icon-md"
            onClick={() => navigate(`/reports/${id}`)}
          />
          <DeleteOutlined
            className="ant-icon-md"
            onClick={handleDeleteReport(id)}
          />
        </div>
      ),
      width: 50,
    },
  ];

  function handleDeleteReport(id) {
    return async () => {
      try {
        tableRef.current.triggerLoading(true);
        await deleteReport(id);
      } catch (error) {
        openNotification({
          title: error.message,
          type: "error",
        });
      }
      tableRef.current.refreshTable();
    };
  }

  const fetchData = useCallback(
    async ({ pageSize, pageNumber, search }) => {
      try {
        const { reports, count } = await getAllReports({
          page: pageNumber,
          limit: pageSize,
          ...(search && { name: search }),
        });
        setData(reports);
        return { count };
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

export default injectIntl(Reports);
