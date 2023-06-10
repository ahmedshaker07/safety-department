import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import classNames from "classnames";

import { mediaHook } from "../../../utils/hooks";
import { ContextWrapper } from "../../../contexts/layout.context";

import ASHeader from "../../ASHeader/ASHeader";
import ASSidebar from "../../ASSidebar/ASSidebar";

import "./DefaultLayout.scss";

function DefaultLayout() {
  const { isSidebarHidden, setIsSidebarHidden } = useContext(ContextWrapper);

  return (
    <Layout
      className={classNames("default-layout", {
        "default-layout__sidebar-hidden": isSidebarHidden,
      })}
    >
      <ASSidebar setIsSidebarHidden={setIsSidebarHidden} />
      <Layout
        className={classNames("inner-layout", {
          "inner-layout__blurry": !isSidebarHidden,
        })}
      >
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
