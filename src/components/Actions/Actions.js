import { useCallback, useContext, useRef, useState } from "react";
import { Form, Modal, Select, Tooltip } from "antd";
import { injectIntl } from "react-intl";
import { DeleteOutlined } from "@ant-design/icons";

import { LayoutContextWrapper } from "../../contexts/layout.context";
import {
  createAction,
  deleteAction,
  editAction,
  getAllActions,
} from "../../services/actions";

import TableLayout from "../Layouts/TableLayout/TableLayout";
import ASFormItem from "../ASFormItem/ASFormItem";
import ASButton from "../ASButton/ASButton";
import { getLocale } from "../../utils/intl-provider";

function Actions({ intl }) {
  const [data, setData] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [record, setRecord] = useState();
  const [isCreatingAction, setIsCreatingAction] = useState(false);
  const [actionToDelete, setActionToDelete] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { openNotification } = useContext(LayoutContextWrapper);

  const tableRef = useRef();

  const [createActionForm] = Form.useForm();

  const ACTIONS_COLUMNS = [
    {
      title: intl.formatMessage({ id: "common.name" }),
      render: ({ name, nameAr }) =>
        `${getLocale() === "en" ? name || nameAr : nameAr || name}`,
    },
    {
      title: intl.formatMessage({ id: "actions.type" }),
      dataIndex: "type",
      render: (type) =>
        intl.formatMessage({ id: `actions.${type?.toLowerCase()}` }),
    },
    {
      render: ({ id }) =>
        ![37, 36].includes(id) && (
          <div className="reports-actions" onClick={(e) => e.stopPropagation()}>
            <Tooltip title={intl.formatMessage({ id: "common.delete" })}>
              <DeleteOutlined
                className="ant-icon-sm"
                onClick={openDeleteModal(id)}
              />
            </Tooltip>
          </div>
        ),
      width: 50,
    },
  ];

  function handleDeleteAction(id) {
    return async () => {
      try {
        tableRef.current.triggerLoading(true);
        await deleteAction(id);
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
    async ({ pageSize, pageNumber, sorter, search }) => {
      try {
        const { actions, count } = await getAllActions({
          page: pageNumber,
          limit: pageSize,
        });
        setData(actions);

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

  const onOpenModal = ({ data }) => {
    if (data) {
      if (![37, 36].includes(data.id)) {
        setRecord(data);
        createActionForm.setFieldsValue(data);
        setIsModalOpen(true);
      }
    } else {
      setIsModalOpen(true);
    }
  };

  const onCancel = () => {
    setRecord(null);
    createActionForm.resetFields();
    setIsModalOpen(false);
  };

  function openDeleteModal(id) {
    return () => {
      setIsDeleteModalOpen(true);
      setActionToDelete(id);
    };
  }

  function onCloseDeleteModal() {
    setIsDeleteModalOpen(false);
    setActionToDelete(null);
  }

  const onSubmit = async (values) => {
    try {
      setIsCreatingAction(true);
      await (record
        ? editAction(record.id, { set: values })
        : createAction(values));
      tableRef.current.refreshTable({});
      onCancel();
    } catch (error) {
      openNotification({
        title: error.message,
        type: "error",
      });
    }
    setIsCreatingAction(false);
  };

  return (
    <>
      <Modal
        open={isModalOpen}
        centered
        footer={null}
        title={intl.formatMessage({
          id: `actions.${record ? "edit_action" : "create_action"}`,
        })}
        onCancel={onCancel}
      >
        <Form layout="vertical" form={createActionForm} onFinish={onSubmit}>
          <Form.Item
            name="type"
            label={intl.formatMessage({ id: "actions.type" })}
            rules={[{ required: true, message: "" }]}
            hasFeedback
          >
            <Select
              placeholder={intl.formatMessage({ id: "actions.type" })}
              options={[
                {
                  value: "SAFE_ACTION",
                  label: intl.formatMessage({ id: "reports.safe_action" }),
                },
                {
                  value: "UN_SAFE_ACTION",
                  label: intl.formatMessage({ id: "reports.unsafe_action" }),
                },
              ]}
            />
          </Form.Item>
          <ASFormItem
            name="name"
            label={intl.formatMessage({ id: "common.name" })}
            placeholder={intl.formatMessage({ id: "common.name" })}
            rules={[{ required: true, message: "" }]}
            hasFeedback
          />
          <div className="modal-footer">
            <ASButton
              label={intl.formatMessage({ id: "common.cancel" })}
              type="destructive-basic"
              onClick={onCancel}
              disabled={isCreatingAction}
            />
            <ASButton
              label={intl.formatMessage({ id: "common.confirm" })}
              htmlType="submit"
              loading={isCreatingAction}
            />
          </div>
        </Form>
      </Modal>
      <Modal
        open={isDeleteModalOpen}
        centered
        footer={null}
        title={intl.formatMessage({
          id: "confirmation_modal.delete_report",
        })}
        onCancel={onCloseDeleteModal}
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
            onClick={handleDeleteAction(actionToDelete)}
          />
          <ASButton
            label={intl.formatMessage({ id: "common.cancel" })}
            onClick={onCloseDeleteModal}
          />
        </div>
      </Modal>
      <TableLayout
        btnLabel={intl.formatMessage({ id: "actions.create_action" })}
        columns={ACTIONS_COLUMNS}
        dataSource={data}
        fetchData={fetchData}
        rowKey={(record) => record.id}
        tableRef={tableRef}
        onClick={onOpenModal}
        onRowClick={onOpenModal}
      />
    </>
  );
}

export default injectIntl(Actions);
