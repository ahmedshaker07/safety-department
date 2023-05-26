import { Layout } from "antd";

import ASLanguageChanger from "../ASLanguageChanger/ASLanguageChanger";

import "./ASHeader.scss";

const { Header } = Layout;

function ASHeader() {
  return (
    <Header className="as-header">
      <img
        width="150"
        height="64"
        src="https://www.consolis.com/wp-content/uploads/2020/02/logo-consolis-svg.svg"
        alt=""
      />
      <ASLanguageChanger />
    </Header>
  );
}

export default ASHeader;
