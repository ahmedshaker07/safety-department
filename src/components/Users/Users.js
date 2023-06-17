import { useCallback, useContext, useRef, useState } from "react";
import { injectIntl } from "react-intl";
import qs from "qs";
import { Form, Modal, Select } from "antd";

import { USERS_COLUMNS } from "../../constants/users";
import { ContextWrapper } from "../../contexts/layout.context";

import TableLayout from "../Layouts/TableLayout/TableLayout";
import ASFormItem from "../ASFormItem/ASFormItem";
import ASButton from "../ASButton/ASButton";

const getRandomuserParams = (params) => ({
  results: params.pagination?.pageSize,
  page: params.pagination?.current,
  ...params,
});

function Users({ intl }) {
  const [data, setData] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [record, setRecord] = useState();

  const tableRef = useRef();

  const [createUserForm] = Form.useForm();

  const { openNotification } = useContext(ContextWrapper);

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

  const onSubmit = (values) => {
    try {
      console.log(values);
      tableRef.current.refreshTable();
      onCancel();
    } catch (error) {
      openNotification({
        title: error,
        type: "error",
      });
    }
  };

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
            name="phone"
            placeholder={intl.formatMessage({ id: "users.phone" })}
            label={intl.formatMessage({ id: "users.phone" })}
            rules={[{ required: true, message: "" }]}
            hasFeedback
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
                  value: "admin",
                  label: intl.formatMessage({ id: "users.admin" }),
                },
                {
                  value: "reporter",
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
            />
            <ASButton
              label={intl.formatMessage({ id: "common.confirm" })}
              htmlType="submit"
            />
          </div>
        </Form>
      </Modal>
      <TableLayout
        btnLabel={intl.formatMessage({ id: "users.create_user" })}
        columns={USERS_COLUMNS}
        dataSource={data}
        fetchData={fetchData}
        rowKey={(record) => record.login.uuid}
        tableRef={tableRef}
        onClick={onOpenModal}
        onRowClick={onOpenModal}
      />
    </>
  );
}

export default injectIntl(Users);
