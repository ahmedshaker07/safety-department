import { Layout } from "antd";
import { injectIntl } from "react-intl";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";

import { mediaHook } from "../../utils/hooks";

import ASButton from "../ASButton/ASButton";

import ECPCLogo from "../../assests/images/ECPC_logo.png";

import "./ASSidebar.scss";

const { Sider } = Layout;

function ASSidebar({
  intl,
  setIsSidebarHidden,
  mobileScreenSizes: { isLargeMobileScreen }
}) {
  const pathname = window.location.pathname;

  const SIDEBAR_TABS = {
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
      },
      {
        path: "/reports/day",
        label: intl.formatMessage({
          id: "header.tabs_name.reports_by_day"
        })
      },
      {
        path: "/reports/reporter",
        label: intl.formatMessage({
          id: "header.tabs_name.reports_by_reporter"
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

  const navigate = useNavigate();

  function onTabClick(path) {
    setIsSidebarHidden(isLargeMobileScreen);
    navigate(path);
  }

  return (
    <Sider className="sidebar">
      <div className="sidebar__upper-section">
        <img width="100%" height="64" src={ECPCLogo} alt="" />
        <div>
          <div className="sidebar__section">
            <span className="subheading">
              {intl.formatMessage({ id: "header.tabs_sections.home" })}
            </span>
            <div className="sidebar__section-buttons">
              {SIDEBAR_TABS.home.map(({ path, label }, idx) => (
                <ASButton
                  key={idx}
                  type="text"
                  label={label}
                  className={classNames("button as-sider-button", {
                    "as-sider-button-active": pathname === path
                  })}
                  onClick={() => {
                    onTabClick(path);
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
              {SIDEBAR_TABS.reports.map(({ path, label }, idx) => (
                <ASButton
                  key={idx}
                  type="text"
                  label={label}
                  className={classNames("button as-sider-button", {
                    "as-sider-button-active": pathname === path
                  })}
                  onClick={() => {
                    onTabClick(path);
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="sidebar__section">
        <div className="sidebar__section-buttons">
          {SIDEBAR_TABS.bottom.map(({ path, label }, idx) => (
            <ASButton
              key={idx}
              type="text"
              label={label}
              className={classNames("button as-sider-button", {
                "as-sider-button-active": pathname === path
              })}
              onClick={() => {
                onTabClick(path);
              }}
            />
          ))}
        </div>
      </div>
    </Sider>
  );
}

export default injectIntl(mediaHook(ASSidebar));
