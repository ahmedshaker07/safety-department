import { Layout } from "antd";
import { MenuOutlined } from "@ant-design/icons";

import { isAuth } from "../../utils/helpers";
import { mediaHook } from "../../utils/hooks";

import ASLanguageChanger from "../ASLanguageChanger/ASLanguageChanger";

import ECPCLogo from "../../assests/images/ECPC_Logo_original.png";

import "./ASHeader.scss";

const { Header } = Layout;

function ASHeader({
  setIsSidebarHidden,
  isSidebarHidden,
  mobileScreenSizes: { isLargeMobileScreen }
}) {
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
          <img width="100%" height="64" src={ECPCLogo} alt="" />
        )}
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

export default mediaHook(ASHeader);
