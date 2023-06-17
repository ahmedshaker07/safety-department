import { Layout } from "antd";
import { injectIntl } from "react-intl";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";

import { mediaHook } from "../../utils/hooks";
import { SIDEBAR_UPPER_SECTIONS } from "../../constants/helpers";

import ASButton from "../ASButton/ASButton";

import "./ASSidebar.scss";

const { Sider } = Layout;

function ASSidebar({
  intl,
  setIsSidebarHidden,
  mobileScreenSizes: { isLargeMobileScreen },
}) {
  const pathname = window.location.pathname;

  const SIDEBAR_TABS = {
    home: [
      {
        path: "/overview",
        label: intl.formatMessage({
          id: "header.tabs_name.overview",
        }),
      },
      {
        path: "/analytics",
        label: intl.formatMessage({
          id: "header.tabs_name.analytics",
        }),
      },
    ],
    reports: [
      {
        path: "/reports",
        label: intl.formatMessage({
          id: "header.tabs_name.reports",
        }),
      },
      {
        path: "/reports/day",
        label: intl.formatMessage({
          id: "header.tabs_name.reports_by_day",
        }),
      },
      {
        path: "/reports/reporter",
        label: intl.formatMessage({
          id: "header.tabs_name.reports_by_reporter",
        }),
      },
    ],
    entities: [
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
    ],
    bottom: [
      {
        path: "/settings",
        label: intl.formatMessage({
          id: "header.tabs_name.settings",
        }),
      },
    ],
  };

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
              name: "Sherif",
            }
          )}
        </span>
        <div>
          {Object.keys(SIDEBAR_TABS).map(
            (section, idx) =>
              SIDEBAR_UPPER_SECTIONS.includes(section) && (
                <div className="sidebar__section" key={idx}>
                  <span className="subheading">
                    {intl.formatMessage({
                      id: `header.tabs_sections.${section}`,
                    })}
                  </span>
                  <div className="sidebar__section-buttons">
                    {SIDEBAR_TABS[section].map(({ path, label }, idx) => (
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
              )
          )}
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
