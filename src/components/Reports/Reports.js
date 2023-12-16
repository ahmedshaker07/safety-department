import { useCallback, useContext, useRef, useState } from "react";
import { injectIntl } from "react-intl";
import { useNavigate } from "react-router-dom";
import {
  DeleteOutlined,
  EditOutlined,
  FilePdfOutlined,
} from "@ant-design/icons";
import { Tooltip, Modal } from "antd";

import { LayoutContextWrapper } from "../../contexts/layout.context";
import { deleteReport, getAllReports } from "../../services/reports";
import { fmt } from "../IntlWrapper/IntlWrapper";
import { checkSmartDate } from "../../utils/helpers";
import { getLocale } from "../../utils/intl-provider";

import TableLayout from "../Layouts/TableLayout/TableLayout";
import ASButton from "../ASButton/ASButton";

import "./Reports.scss";

function Reports({ intl }) {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reportToDelete, setReportToDelete] = useState(null);

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
      render: (department) =>
        getLocale() === "en"
          ? department?.name || department?.nameAr
          : department?.nameAr || department?.name,
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
          <Tooltip title={intl.formatMessage({ id: "common.export" })}>
            <FilePdfOutlined className="ant-icon-md" />
          </Tooltip>
          <Tooltip title={intl.formatMessage({ id: "common.edit" })}>
            <EditOutlined
              className="ant-icon-md"
              onClick={() => navigate(`/reports/${id}`)}
            />
          </Tooltip>
          <Tooltip title={intl.formatMessage({ id: "common.delete" })}>
            <DeleteOutlined className="ant-icon-md" onClick={openModal(id)} />
          </Tooltip>
        </div>
      ),
      width: 50,
    },
  ];

  function openModal(id) {
    return () => {
      setIsModalOpen(true);
      setReportToDelete(id);
    };
  }

  function onCancel() {
    setIsModalOpen(false);
    setReportToDelete(null);
  }

  function handleDeleteReport(id) {
    return async () => {
      try {
        tableRef.current.triggerLoading(true);
        await deleteReport(id);
        setReportToDelete(null);
        setIsModalOpen(false);
      } catch (error) {
        openNotification({
          title: error.message,
          type: "error",
        });
      }
      tableRef.current.refreshTable({
        pageNumber: tableRef.current.getPageNumber(),
      });
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
    <>
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
      <Modal
        open={isModalOpen}
        centered
        footer={null}
        title={intl.formatMessage({
          id: "confirmation_modal.delete_report",
        })}
        onCancel={onCancel}
        className="confirmation-modal"
      >
        <span>
          {intl.formatMessage({
            id: "confirmation_modal.delete_report_confirm",
          })}
        </span>
        <div className="confirmation-modal-actions">
          <ASButton
            label={intl.formatMessage({ id: "common.delete" })}
            type="destructive-basic"
            onClick={handleDeleteReport(reportToDelete)}
          />
          <ASButton
            label={intl.formatMessage({ id: "common.cancel" })}
            onClick={onCancel}
          />
        </div>
      </Modal>
    </>
  );
}

export default injectIntl(Reports);
