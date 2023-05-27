import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import classNames from "classnames";

import { mediaHook } from "../../utils/hooks";

import ASHeader from "../ASHeader/ASHeader";
import ASSidebar from "../ASSidebar/ASSidebar";

import "./DefaultLayout.scss";

function DefaultLayout({ mobileScreenSizes: { isLargeMobileScreen } }) {
  const [isSidebarHidden, setIsSidebarHidden] = useState(false);

  useEffect(() => {
    setIsSidebarHidden(isLargeMobileScreen);
  }, [isLargeMobileScreen]);

  return (
    <Layout
      className={classNames("default-layout", {
        "default-layout__sidebar-hidden": isSidebarHidden
      })}
    >
      <ASSidebar setIsSidebarHidden={setIsSidebarHidden} />
      <Layout className="inner-layout">
        <ASHeader
          setIsSidebarHidden={setIsSidebarHidden}
          isSidebarHidden={isSidebarHidden}
        />
        <Outlet />
      </Layout>
    </Layout>
  );
}

export default mediaHook(DefaultLayout);
