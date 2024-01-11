import { Layout } from "antd";
import { injectIntl } from "react-intl";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import { mediaHook } from "../../utils/hooks";
import { ContextWrapper } from "../../contexts/user.context";
import { getUserReportStats } from "../../services/reports";

import ASButton from "../ASButton/ASButton";

import "./ASSidebar.scss";

const { Sider } = Layout;

function ASSidebar({
  intl,
  setIsSidebarHidden,
  mobileScreenSizes: { isLargeMobileScreen },
}) {
  const { userData, permissions } = useContext(ContextWrapper);
  const [reportsCount, setReportsCount] = useState();

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
    ...(permissions.VIEW_ANALYTICS
      ? {
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
        }
      : {}),
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
    ...(permissions.DASHBOARD_DATA_MANAGEMENT
      ? [
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
        ]
      : []),
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

  async function getUserStats() {
    try {
      const { reportCount } = await getUserReportStats();
      setReportsCount(reportCount);
    } catch (e) {
      //
    }
  }

  useEffect(() => {
    getUserStats();
  }, []);

  return (
    <Sider className="sidebar">
      <div className="sidebar__upper-section">
        <div className="sidebar-header">
          <span className="display-xs">
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
          {!isNaN(reportsCount) && userData?.reportsTarget && (
            <span>
              {intl.formatMessage(
                { id: "header.reports_count" },
                { reports: reportsCount, target: userData?.reportsTarget }
              )}
            </span>
          )}
        </div>

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
