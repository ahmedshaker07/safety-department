import { useState } from "react";
import { injectIntl } from "react-intl";
import { useNavigate } from "react-router-dom";
import { Form, Input } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";

import ASButton from "../../ASButton/ASButton";

import "./AddEditReport.scss";
import { Divider } from "antd";

function AddEditReport({ intl }) {
  const [actions, setActions] = useState({
    safe: [
      {
        name: "safe-0",
        key: 0,
        isListField: true,
        fieldKey: 0,
      },
    ],
    unsafe: [
      {
        name: "unsafe-0",
        key: 0,
        isListField: true,
        fieldKey: 0,
      },
    ],
    followup: [
      [
        {
          name: "followup-1",
          key: 1,
          isListField: true,
          fieldKey: 1,
        },
        {
          name: "whom-1",
          key: 2,
          isListField: true,
          fieldKey: 2,
        },
        {
          name: "when-1",
          key: 3,
          isListField: true,
          fieldKey: 3,
        },
        {
          name: "nmha-1",
          key: 4,
          isListField: true,
          fieldKey: 4,
        },
      ],
    ],
  });

  const navigate = useNavigate();

  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const actionsFormList = ({
    name,
    arr,
    type,
    placeholder,
    ctaLabel,
    limit,
  }) => {
    return (
      <Form.List name={name}>
        {() => (
          <>
            {arr.map((field) => (
              <Form.Item className="add-edit-report__action" key={field.key}>
                <Form.Item {...field} noStyle>
                  <Input placeholder={placeholder} />
                </Form.Item>
                {arr.length > 1 && (
                  <MinusCircleOutlined
                    onClick={() => {
                      setActions((prevActions) => {
                        return {
                          ...prevActions,
                          [type]: prevActions[type].filter(
                            (action) => action.key !== field.key
                          ),
                        };
                      });
                      form.resetFields([[name, field.name]]);
                    }}
                  />
                )}
              </Form.Item>
            ))}
            {arr.length < limit && (
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() =>
                    setActions({
                      ...actions,
                      [type]: [
                        ...actions[type],
                        {
                          name: `${type}-${arr[arr.length - 1].key + 1}`,
                          key: arr[arr.length - 1].key + 1,
                          isListField: true,
                          fieldKey: arr[arr.length - 1].key + 1,
                        },
                      ],
                    })
                  }
                  icon={<PlusOutlined />}
                >
                  {ctaLabel}
                </Button>
              </Form.Item>
            )}
          </>
        )}
      </Form.List>
    );
  };

  const followupActionsFormList = ({
    name,
    arr,
    type,
    placeholder,
    ctaLabel,
    limit,
  }) => {
    return (
      <Form.List name={name}>
        {() => (
          <>
            {arr.map((field, index) => (
              <>
                <div className="add-edit-report__followup-action">
                  <Form.Item
                    className="add-edit-report__action"
                    key={field.key}
                  >
                    <Form.Item {...field[0]} noStyle>
                      <Input placeholder={placeholder} />
                    </Form.Item>
                    <div>
                      <Form.Item {...field[1]} noStyle>
                        <Input
                          placeholder={intl.formatMessage({
                            id: "reports.by_whom",
                          })}
                        />
                      </Form.Item>
                      <Form.Item {...field[2]} noStyle>
                        <Input
                          placeholder={intl.formatMessage({
                            id: "reports.by_when",
                          })}
                        />
                      </Form.Item>
                      <Form.Item {...field[3]} noStyle>
                        <Input
                          placeholder={intl.formatMessage({
                            id: "reports.nmha_card",
                          })}
                        />
                      </Form.Item>
                    </div>
                  </Form.Item>
                  {arr.length > 1 ? (
                    <MinusCircleOutlined
                      onClick={() => {
                        setActions((prevActions) => {
                          const newActions = prevActions[type];
                          newActions.splice(index, 1);
                          return {
                            ...prevActions,
                            [type]: newActions,
                          };
                        });
                        form.resetFields([
                          [name, field[0].name],
                          [name, field[1].name],
                          [name, field[2].name],
                          [name, field[3].name],
                        ]);
                      }}
                    />
                  ) : null}
                </div>
                {index < arr.length - 1 && arr.length > 1 && <Divider />}
              </>
            ))}
            {arr.length < limit && (
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() =>
                    setActions({
                      ...actions,
                      [type]: [
                        ...actions[type],
                        [
                          {
                            name: `followup-${arr[arr.length - 1][0].key + 1}`,
                            key: arr[arr.length - 1][0].key + 1,
                            fieldKey: arr[arr.length - 1][0].key + 1,
                            isListField: true,
                          },
                          {
                            name: `whom-${arr[arr.length - 1][0].key + 1}`,
                            key: arr[arr.length - 1][0].key + 1,
                            fieldKey: arr[arr.length - 1][0].key + 1,
                            isListField: true,
                          },
                          {
                            name: `when-${arr[arr.length - 1][0].key + 1}`,
                            key: arr[arr.length - 1][0].key + 1,
                            fieldKey: arr[arr.length - 1][0].key + 1,
                            isListField: true,
                          },
                          {
                            name: `nmha-${arr[arr.length - 1][0].key + 1}`,
                            key: arr[arr.length - 1][0].key + 1,
                            fieldKey: arr[arr.length - 1][0].key + 1,
                            isListField: true,
                          },
                        ],
                      ],
                    })
                  }
                  icon={<PlusOutlined />}
                >
                  {ctaLabel}
                </Button>
              </Form.Item>
            )}
          </>
        )}
      </Form.List>
    );
  };

  return (
    <Form
      className="add-edit-report__form"
      layout="vertical"
      onFinish={onFinish}
      form={form}
    >
      <div className="add-edit-report__actions">
        <ASButton
          type="destructive-basic"
          label={intl.formatMessage({ id: "common.cancel" })}
          onClick={() => navigate("/reports")}
        />
        <ASButton label={intl.formatMessage({ id: "common.save" })} />
      </div>
      <div className="add-edit-report__first-section">
        <div className="add-edit-report__card">
          <Form.Item
            label={intl.formatMessage({ id: "reports.area" })}
            name="area"
          >
            <Input placeholder={intl.formatMessage({ id: "reports.area" })} />
          </Form.Item>
          <Form.Item
            label={intl.formatMessage({ id: "reports.assessor" })}
            name="assessor"
          >
            <Input
              placeholder={intl.formatMessage({ id: "reports.assessor" })}
            />
          </Form.Item>
          <Form.Item
            label={intl.formatMessage({ id: "reports.assited" })}
            name="assited"
          >
            <Input
              placeholder={intl.formatMessage({ id: "reports.assited" })}
            />
          </Form.Item>
          <Form.Item
            label={intl.formatMessage({ id: "reports.observed" })}
            name="peopleobserved"
          >
            <Input
              placeholder={intl.formatMessage({ id: "reports.observed" })}
            />
          </Form.Item>
        </div>
        <div className="add-edit-report__card">
          <Form.Item
            label={intl.formatMessage({ id: "reports.date" })}
            name="date"
          >
            <Input placeholder={intl.formatMessage({ id: "reports.date" })} />
          </Form.Item>
          <Form.Item
            label={intl.formatMessage({ id: "reports.start_time" })}
            name="starttime"
          >
            <Input
              placeholder={intl.formatMessage({ id: "reports.start_time" })}
            />
          </Form.Item>
          <Form.Item
            label={intl.formatMessage({ id: "reports.finish_time" })}
            name="finishtime"
          >
            <Input
              placeholder={intl.formatMessage({ id: "reports.finish_time" })}
            />
          </Form.Item>
          <Form.Item
            label={intl.formatMessage({ id: "reports.duration" })}
            name="duration"
          >
            <Input
              placeholder={intl.formatMessage({ id: "reports.duration" })}
            />
          </Form.Item>
        </div>
      </div>

      <div className="add-edit-report__card add-edit-report__actions-card">
        <span className="display-xs">
          {intl.formatMessage({ id: "reports.safe_acts" })}
        </span>
        {actionsFormList({
          name: "safeactions",
          arr: actions.safe,
          type: "safe",
          placeholder: intl.formatMessage({
            id: "reports.safe_action",
          }),
          ctaLabel: intl.formatMessage({ id: "reports.add_safe_action" }),
          limit: 7,
        })}
      </div>

      <div className="add-edit-report__alert caption">
        {intl.formatMessage({ id: "reports.hsm" })}
      </div>

      <div className="add-edit-report__card add-edit-report__actions-card">
        <span className="display-xs">
          {intl.formatMessage({ id: "reports.unsafe_acts" })}
        </span>
        {actionsFormList({
          name: "unsafeactions",
          arr: actions.unsafe,
          type: "unsafe",
          placeholder: intl.formatMessage({
            id: "reports.unsafe_action",
          }),
          ctaLabel: intl.formatMessage({ id: "reports.add_unsafe_action" }),
          limit: 7,
        })}
      </div>

      <div className="add-edit-report__card add-edit-report__actions-card">
        <span className="display-xs">
          {intl.formatMessage({ id: "reports.agreed_followups" })}
        </span>
        {followupActionsFormList({
          name: "followupactions",
          arr: actions.followup,
          type: "followup",
          placeholder: intl.formatMessage({
            id: "reports.followup_action",
          }),
          ctaLabel: intl.formatMessage({ id: "reports.add_followup_action" }),
          limit: 4,
        })}
      </div>

      <div className="add-edit-report__alert caption">
        {intl.formatMessage({ id: "reports.nmha" })}
      </div>

      <span className="body-medium">
        {intl.formatMessage({ id: "reports.footer" })}
        <span className="as-text-red ">
          {intl.formatMessage({ id: "reports.safety" })}
        </span>
      </span>
    </Form>
  );
}

export default injectIntl(AddEditReport);
