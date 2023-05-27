import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Layout } from "antd";
import { injectIntl } from "react-intl";
import classNames from "classnames";

import ASHeader from "../ASHeader/ASHeader";
import ASButton from "../ASButton/ASButton";

import "./DefaultLayout.scss";

const { Sider } = Layout;

function DefaultLayout({ intl }) {
  const navigate = useNavigate();
  const pathname = window.location.pathname;

  const tabs = {
    home: [
      {
        path: "/overview",
        label: intl.formatMessage({
          id: "header.tabs_name.overview"
        })
      }
    ],
    reports: [
      {
        path: "/reports",
        label: intl.formatMessage({
          id: "header.tabs_name.reports"
        })
      }
    ],
    bottom: [
      {
        path: "/settings",
        label: intl.formatMessage({
          id: "header.tabs_name.settings"
        })
      }
    ]
  };

  return (
    <Layout className="default-layout">
      <Sider className="sidebar" breakpoint="sm">
        <div className="sidebar__upper-section">
          <img
            width="100%"
            height="64"
            src="https://www.consolis.com/wp-content/uploads/2020/02/logo-consolis-svg.svg"
            alt=""
          />
          <div>
            <div className="sidebar__section">
              <span className="subheading">
                {intl.formatMessage({ id: "header.tabs_sections.home" })}
              </span>
              <div className="sidebar__section-buttons">
                {tabs.home.map(({ path, label }, idx) => (
                  <ASButton
                    key={idx}
                    type="text"
                    label={label}
                    className={classNames("button as-sider-button", {
                      "as-sider-button-active": pathname.includes(path)
                    })}
                    onClick={() => {
                      navigate(path);
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="sidebar__section">
              <span className="subheading">
                {intl.formatMessage({ id: "header.tabs_sections.reports" })}
              </span>
              <div className="sidebar__section-buttons">
                {tabs.reports.map(({ path, label }, idx) => (
                  <ASButton
                    key={idx}
                    type="text"
                    label={label}
                    className={classNames("button as-sider-button", {
                      "as-sider-button-active": pathname.includes(path)
                    })}
                    onClick={() => {
                      navigate(path);
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="sidebar__section">
          <div className="sidebar__section-buttons">
            {tabs.bottom.map(({ path, label }, idx) => (
              <ASButton
                key={idx}
                type="text"
                label={label}
                className={classNames("button as-sider-button", {
                  "as-sider-button-active": pathname.includes(path)
                })}
                onClick={() => {
                  navigate(path);
                }}
              />
            ))}
          </div>
        </div>
      </Sider>
      <Layout className="inner-layout">
        <ASHeader />
        <Outlet />
      </Layout>
    </Layout>
  );
}

export default injectIntl(DefaultLayout);
