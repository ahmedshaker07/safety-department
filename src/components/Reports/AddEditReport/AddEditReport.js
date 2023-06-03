import { useState } from "react";
import { injectIntl } from "react-intl";
import { useNavigate } from "react-router-dom";
import { Form, Input } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";

import ASButton from "../../ASButton/ASButton";

import "./AddEditReport.scss";

function AddEditReport({ intl }) {
  const [actions, setActions] = useState({
    safe: [
      {
        name: "safe-0",
        key: 0,
        isListField: true,
        fieldKey: 0
      }
    ],
    unsafe: [
      {
        name: "unsafe-0",
        key: 0,
        isListField: true,
        fieldKey: 0
      }
    ],
    followUp: [
      {
        name: "followUp-0",
        key: 0,
        isListField: true,
        fieldKey: 0
      }
    ]
  });
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const actionsFormList = ({
    name,
    arr,
    type,
    placeholder,
    ctaLabel,
    limit
  }) => {
    return (
      <Form.List name={name}>
        {() => (
          <>
            {arr.map((field) => (
              <Form.Item
                className="add-edit-report__safe-action"
                key={field.key}
              >
                <Form.Item {...field} noStyle>
                  <Input placeholder={placeholder} />
                </Form.Item>
                {arr.length > 1 ? (
                  <MinusCircleOutlined
                    onClick={() =>
                      setActions((prevActions) => {
                        return {
                          ...prevActions,
                          [type]: prevActions[type].filter(
                            (action) => action.key !== field.key
                          )
                        };
                      })
                    }
                  />
                ) : null}
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
                          name: `safe-${arr[arr.length - 1].key + 1}`,
                          key: arr[arr.length - 1].key + 1,
                          isListField: true,
                          fieldKey: arr[arr.length - 1].key + 1
                        }
                      ]
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
    >
      <div className="add-edit-report__actions">
        <ASButton
          type="destructive-basic"
          label={intl.formatMessage({ id: "common.cancel" })}
          onClick={() => navigate("/reports")}
        />
        <ASButton
          label={intl.formatMessage({ id: "common.save" })}
          onClick={() => navigate("/reports")}
        />
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
            id: "reports.safe_action"
          }),
          ctaLabel: intl.formatMessage({ id: "reports.add_safe_action" }),
          limit: 7
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
            id: "reports.unsafe_action"
          }),
          ctaLabel: intl.formatMessage({ id: "reports.add_unsafe_action" }),
          limit: 7
        })}
      </div>

      <div className="add-edit-report__card add-edit-report__actions-card">
        <span className="display-xs">
          {intl.formatMessage({ id: "reports.agreed_followups" })}
        </span>
        {actionsFormList({
          name: "followupactions",
          arr: actions.followUp,
          type: "followUp",
          placeholder: intl.formatMessage({
            id: "reports.followup_action"
          }),
          ctaLabel: intl.formatMessage({ id: "reports.add_followup_action" }),
          limit: 4
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
