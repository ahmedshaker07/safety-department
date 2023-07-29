import { Layout } from "antd";
import { injectIntl } from "react-intl";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

import { mediaHook } from "../../utils/hooks";
import { ContextWrapper } from "../../contexts/user.context";

import ASButton from "../ASButton/ASButton";

import "./ASSidebar.scss";

const { Sider } = Layout;

function ASSidebar({
  intl,
  setIsSidebarHidden,
  mobileScreenSizes: { isLargeMobileScreen },
}) {
  const { userData } = useContext(ContextWrapper);

  const pathname = window.location.pathname;

  const SIDEBAR_UPPER_SECTIONS = {
    reports: [
      {
        path: "/reports",
        label: intl.formatMessage({
          id: "header.tabs_name.reports",
        }),
      },
    ],
    analytics: [
      {
        path: "/reports/time",
        label: intl.formatMessage({
          id: "header.tabs_name.reports_by_time",
        }),
      },
      {
        path: "/reports/reporter",
        label: intl.formatMessage({
          id: "header.tabs_name.reports_by_reporter",
        }),
      },
      {
        path: "/reports/department",
        label: intl.formatMessage({
          id: "header.tabs_name.reports_by_department",
        }),
      },
    ],
    followup: [
      {
        path: "/followup",
        label: intl.formatMessage({
          id: "header.tabs_name.followup_actions",
        }),
      },
    ],
  };

  const SIDEBAR_BOTTOM_SECTIONS = [
    {
      path: "/users",
      label: intl.formatMessage({
        id: "header.tabs_name.users",
      }),
    },
    {
      path: "/actions",
      label: intl.formatMessage({
        id: "header.tabs_name.actions",
      }),
    },
    {
      path: "/departments",
      label: intl.formatMessage({
        id: "header.tabs_name.departments",
      }),
    },
    {
      path: "/settings",
      label: intl.formatMessage({
        id: "header.tabs_name.settings",
      }),
    },
  ];

  const navigate = useNavigate();

  function onTabClick(path) {
    setIsSidebarHidden(isLargeMobileScreen);
    navigate(path);
  }

  return (
    <Sider className="sidebar">
      <div className="sidebar__upper-section">
        <span className="sidebar-header display-xs">
          {intl.formatMessage(
            { id: "header.name" },
            {
              name:
                userData.fullName.substring(
                  0,
                  userData.fullName.indexOf(" ")
                ) || userData.fullName,
            }
          )}
        </span>
        <div>
          {Object.keys(SIDEBAR_UPPER_SECTIONS).map((section, idx) => (
            <div className="sidebar__section" key={idx}>
              <span className="subheading">
                {intl.formatMessage({
                  id: `header.tabs_sections.${section}`,
                })}
              </span>
              <div className="sidebar__section-buttons">
                {SIDEBAR_UPPER_SECTIONS[section].map(({ path, label }, idx) => (
                  <ASButton
                    key={idx}
                    type="text"
                    label={label}
                    className={classNames("button as-sider-button", {
                      "as-sider-button-active": pathname === path,
                    })}
                    onClick={() => {
                      onTabClick(path);
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="sidebar__section">
        <div className="sidebar__section-buttons">
          {SIDEBAR_BOTTOM_SECTIONS.map(({ path, label }, idx) => (
            <ASButton
              key={idx}
              type="text"
              label={label}
              className={classNames("button as-sider-button", {
                "as-sider-button-active": pathname === path,
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
