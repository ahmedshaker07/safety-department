import { Layout } from "antd";
import { injectIntl } from "react-intl";
import { MenuOutlined } from "@ant-design/icons";

import { isAuth } from "../../utils/helpers";
import { mediaHook } from "../../utils/hooks";

import ASLanguageChanger from "../ASLanguageChanger/ASLanguageChanger";

import "./ASHeader.scss";

const { Header } = Layout;

function ASHeader({
  intl,
  setIsSidebarHidden,
  isSidebarHidden,
  mobileScreenSizes: { isLargeMobileScreen }
}) {
  function getTabTitle() {
    // const mapper = {
    //   "/overview": intl.formatMessage({ id: "header.tabs_name.overview" }),
    //   "/reports": intl.formatMessage({ id: "header.tabs_name.reports" }),
    //   "/settings": intl.formatMessage({ id: "header.tabs_name.settings" })
    // };

    return (
      <div className="as-header__title">
        {isLargeMobileScreen && (
          <MenuOutlined
            onClick={() => {
              setIsSidebarHidden(!isSidebarHidden);
            }}
          />
        )}
        {/* <span className="display-md">{mapper[window.location.pathname]}</span> */}
      </div>
    );
  }

  return (
    <Header className="as-header">
      {isAuth() ? (
        getTabTitle()
      ) : (
        <img
          width="150"
          height="64"
          src="https://www.consolis.com/wp-content/uploads/2020/02/logo-consolis-svg.svg"
          alt=""
        />
      )}
      <ASLanguageChanger />
    </Header>
  );
}

export default injectIntl(mediaHook(ASHeader));
