import { useCallback, useContext, useRef, useState } from "react";
import { injectIntl } from "react-intl";
import { Form, Modal } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import { LayoutContextWrapper } from "../../contexts/layout.context";
import {
  createDepartment,
  deleteDepartment,
  editDepartment,
  getAllDepartments,
} from "../../services/departments";

import TableLayout from "../Layouts/TableLayout/TableLayout";
import ASButton from "../ASButton/ASButton";
import ASFormItem from "../ASFormItem/ASFormItem";

function Departments({ intl }) {
  const [data, setData] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [record, setRecord] = useState();
  const [isCreatingDepartment, setIsCreatingDepartment] = useState(false);

  const { openNotification } = useContext(LayoutContextWrapper);

  const tableRef = useRef();

  const [createDepartmentForm] = Form.useForm();

  const DEPARTMENTS_COLUMNS = [
    {
      title: "Name",
      dataIndex: "name",
      render: (name) => `${name}`,
    },
    {
      render: ({ id }) => (
        <div className="reports-actions" onClick={(e) => e.stopPropagation()}>
          <DeleteOutlined
            className="ant-icon-sm"
            onClick={handleDeleteDepartment(id)}
          />
        </div>
      ),
      width: 50,
    },
  ];

  function handleDeleteDepartment(id) {
    return async () => {
      try {
        tableRef.current.triggerLoading(true);
        await deleteDepartment(id);
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
        const { departments, count } = await getAllDepartments({
          page: pageNumber,
          limit: pageSize,
          ...(search && { name: search }),
        });
        setData(departments);

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
      setRecord(data);
      createDepartmentForm.setFieldsValue(data);
    }
    setIsModalOpen(true);
  };

  const onCancel = () => {
    setRecord(null);
    createDepartmentForm.resetFields();
    setIsModalOpen(false);
  };

  const onSubmit = async (values) => {
    try {
      setIsCreatingDepartment(true);
      await (record
        ? editDepartment(record.id, { set: values })
        : createDepartment(values));
      tableRef.current.refreshTable({});
      onCancel();
    } catch (error) {
      openNotification({
        title: error.message,
        type: "error",
      });
    }
    setIsCreatingDepartment(false);
  };

  return (
    <>
      <Modal
        open={isModalOpen}
        centered
        footer={null}
        title={intl.formatMessage({
          id: `departments.${record ? "edit_department" : "create_department"}`,
        })}
        onCancel={onCancel}
      >
        <Form layout="vertical" form={createDepartmentForm} onFinish={onSubmit}>
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
              disabled={isCreatingDepartment}
            />
            <ASButton
              label={intl.formatMessage({ id: "common.confirm" })}
              htmlType="submit"
              loading={isCreatingDepartment}
            />
          </div>
        </Form>
      </Modal>
      <TableLayout
        btnLabel={intl.formatMessage({ id: "departments.create_department" })}
        columns={DEPARTMENTS_COLUMNS}
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

export default injectIntl(Departments);
