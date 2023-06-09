import { useContext } from "react";
import { Layout } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { injectIntl } from "react-intl";

import { mediaHook } from "../../utils/hooks";
import { ContextWrapper } from "../../contexts/user.context";
import { logout } from "../../utils/helpers";

import ASLanguageChanger from "../ASLanguageChanger/ASLanguageChanger";
import ASButton from "../ASButton/ASButton";

import ECPCLogo from "../../assests/images/ECPC_Logo_original.png";

import "./ASHeader.scss";

const { Header } = Layout;

function ASHeader({
  intl,
  isSidebarHidden,
  setIsSidebarHidden,
  mobileScreenSizes: { isLargeMobileScreen },
}) {
  const { token } = useContext(ContextWrapper);

  function getTabTitle() {
    return (
      <div className="as-header__title">
        {isLargeMobileScreen && (
          <MenuOutlined
            onClick={() => {
              setIsSidebarHidden(!isSidebarHidden);
            }}
          />
        )}
        {(isSidebarHidden || !isLargeMobileScreen) && (
          <img width="160" height="64" src={ECPCLogo} alt="" />
        )}
      </div>
    );
  }

  return (
    <Header className="as-header">
      {token ? (
        getTabTitle()
      ) : (
        <img
          width="150"
          height="64"
          src="https://www.consolis.com/wp-content/uploads/2020/02/logo-consolis-svg.svg"
          alt=""
        />
      )}
      <div>
        <ASLanguageChanger />
        {token && !isLargeMobileScreen && (
          <ASButton
            label={intl.formatMessage({ id: "common.logout" })}
            onClick={logout}
          />
        )}
      </div>
    </Header>
  );
}

export default injectIntl(mediaHook(ASHeader));
