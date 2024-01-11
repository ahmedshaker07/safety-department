import { useCallback, useContext, useRef, useState } from "react";
import { injectIntl } from "react-intl";
import { Form, Modal, Select, Tooltip } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { isEmpty } from "lodash";

import { LayoutContextWrapper } from "../../contexts/layout.context";
import {
  createUser,
  deleteUser,
  editUser,
  getAllUsers,
} from "../../services/users";
import { difference } from "../../utils/helpers";

import TableLayout from "../Layouts/TableLayout/TableLayout";
import ASFormItem from "../ASFormItem/ASFormItem";
import ASButton from "../ASButton/ASButton";
import { fmt } from "../IntlWrapper/IntlWrapper";

function Users({ intl }) {
  const [data, setData] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [record, setRecord] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const tableRef = useRef();

  const [createUserForm] = Form.useForm();

  const { openNotification } = useContext(LayoutContextWrapper);

  const USERS_COLUMNS = [
    {
      title: fmt({ id: "users.full_name" }),
      dataIndex: "fullName",
    },
    {
      title: fmt({ id: "signin.email" }),
      dataIndex: "email",
    },
    {
      title: fmt({ id: "users.phone" }),
      dataIndex: "phoneNumber",
    },
    {
      title: fmt({ id: "users.role" }),
      dataIndex: "role",
      render: (role) => fmt({ id: `users.${role?.toLowerCase()}` }),
    },
    {
      render: ({ id }) => (
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

  function openDeleteModal(id) {
    return () => {
      setIsDeleteModalOpen(true);
      setUserToDelete(id);
    };
  }

  function onCloseDeleteModal() {
    setIsDeleteModalOpen(false);
    setUserToDelete(null);
  }

  function handleDeleteUser(id) {
    return async () => {
      try {
        tableRef.current.triggerLoading(true);
        await deleteUser(id);
        setIsDeleteModalOpen(false);
        setUserToDelete(null);
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
        const { users, count } = await getAllUsers({
          page: pageNumber,
          limit: pageSize,
        });
        setData(users);

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
      createUserForm.setFieldsValue(data);
    }
    setIsModalOpen(true);
  };

  const onCancel = () => {
    setRecord(null);
    createUserForm.resetFields();
    setIsModalOpen(false);
  };

  const onSubmit = async ({
    email,
    password,
    fullName,
    phoneNumber,
    role,
    reportsTarget,
  }) => {
    const payload = {
      email,
      password,
      fullName,
      phoneNumber,
      role,
      reportsTarget,
    };

    try {
      setIsSubmitting(true);
      if (record) {
        const editPayload = difference(record, payload);
        if (isEmpty(editPayload)) {
          setIsSubmitting(false);
          return onCancel();
        }
        await editUser(record.id, { set: editPayload });
      } else {
        await createUser(payload);
      }
      tableRef.current.refreshTable({});
      onCancel();
    } catch (error) {
      openNotification({
        title: error.message,
        type: "error",
      });
    }
    setIsSubmitting(false);
  };

  return (
    <>
      <Modal
        open={isModalOpen}
        centered
        footer={null}
        title={intl.formatMessage({
          id: `users.${record ? "edit_user" : "create_new_user"}`,
        })}
        onCancel={onCancel}
      >
        <Form layout="vertical" form={createUserForm} onFinish={onSubmit}>
          <ASFormItem
            name="fullName"
            label={intl.formatMessage({ id: "users.full_name" })}
            placeholder={intl.formatMessage({ id: "users.full_name" })}
            rules={[{ required: true, message: "" }]}
            hasFeedback
          />
          <ASFormItem
            name="email"
            placeholder={intl.formatMessage({ id: "signin.email" })}
            label={intl.formatMessage({ id: "signin.email" })}
            rules={[{ required: true, message: "" }]}
            hasFeedback
          />
          {!record && (
            <ASFormItem
              name="password"
              isPassword
              placeholder={intl.formatMessage({ id: "signin.password" })}
              label={intl.formatMessage({ id: "signin.password" })}
              rules={[{ required: true, message: "" }]}
              autoComplete="new-password"
              hasFeedback
            />
          )}
          <ASFormItem
            name="phoneNumber"
            placeholder={intl.formatMessage({ id: "users.phone" })}
            label={intl.formatMessage({ id: "users.phone" })}
            rules={[{ required: true, message: "" }]}
            hasFeedback
          />
          <ASFormItem
            name="reportsTarget"
            placeholder={intl.formatMessage({ id: "users.target" })}
            label={intl.formatMessage({ id: "users.target" })}
          />
          <Form.Item
            name="role"
            label={intl.formatMessage({ id: "users.role" })}
            rules={[{ required: true, message: "" }]}
            hasFeedback
          >
            <Select
              placeholder={intl.formatMessage({ id: "users.role" })}
              options={[
                {
                  value: "ADMIN",
                  label: intl.formatMessage({ id: "users.admin" }),
                },
                {
                  value: "REPORTER",
                  label: intl.formatMessage({ id: "users.reporter" }),
                },
              ]}
            />
          </Form.Item>
          <div className="modal-footer">
            <ASButton
              label={intl.formatMessage({ id: "common.cancel" })}
              type="destructive-basic"
              onClick={onCancel}
              disabled={isSubmitting}
            />
            <ASButton
              label={intl.formatMessage({ id: "common.confirm" })}
              htmlType="submit"
              loading={isSubmitting}
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
            onClick={handleDeleteUser(userToDelete)}
          />
          <ASButton
            label={intl.formatMessage({ id: "common.cancel" })}
            onClick={onCloseDeleteModal}
          />
        </div>
      </Modal>
      <TableLayout
        btnLabel={intl.formatMessage({ id: "users.create_user" })}
        columns={USERS_COLUMNS}
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

export default injectIntl(Users);
