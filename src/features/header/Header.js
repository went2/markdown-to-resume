import React from "react";

import "./Header.less";

import HeaderLeft from "./HeaderLeft";
import HeaderRight from "./HeaderRight";

function Header() {
  return (
    <div className="mr-header">
      <HeaderLeft />
      <h1 className="title">
        <div className="title-text">
          <span>M</span>arkdown to <span>R</span>esume
        </div>
        <div className="desc">完全运行在本地的 markdown 转 pdf 工具</div>
      </h1>
      <HeaderRight />
    </div>
  );
}

export default Header;
