import { useCallback, useContext, useRef, useState } from "react";
import { Form, Modal, Select } from "antd";
import { injectIntl } from "react-intl";
import qs from "qs";

import { ACTIONS_COLUMNS } from "../../constants/actions";
import { ContextWrapper } from "../../contexts/layout.context";

import TableLayout from "../Layouts/TableLayout/TableLayout";
import ASFormItem from "../ASFormItem/ASFormItem";
import ASButton from "../ASButton/ASButton";

const getRandomuserParams = (params) => ({
  results: params.pagination?.pageSize,
  page: params.pagination?.current,
  ...params,
});

function Actions({ intl }) {
  const [data, setData] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [record, setRecord] = useState();

  const { openNotification } = useContext(ContextWrapper);

  const tableRef = useRef();

  const [createActionForm] = Form.useForm();

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

  const onOpenModal = ({ data }) => {
    if (data) {
      setRecord(data);
      createActionForm.setFieldsValue(data);
    }
    setIsModalOpen(true);
  };

  const onCancel = () => {
    setRecord(null);
    createActionForm.resetFields();
    setIsModalOpen(false);
  };

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
                  value: "safe",
                  label: intl.formatMessage({ id: "reports.safe_action" }),
                },
                {
                  value: "unsafe",
                  label: intl.formatMessage({ id: "reports.unsafe_action" }),
                },
                {
                  value: "followup",
                  label: intl.formatMessage({ id: "reports.followup_action" }),
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
            />
            <ASButton
              label={intl.formatMessage({ id: "common.confirm" })}
              htmlType="submit"
            />
          </div>
        </Form>
      </Modal>
      <TableLayout
        btnLabel={intl.formatMessage({ id: "actions.create_action" })}
        columns={ACTIONS_COLUMNS}
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

export default injectIntl(Actions);
