import React from "react";

import "./Header.less";

import HeaderLeft from "./HeaderLeft";
import HeaderRight from "./HeaderRight";

function Header() {
  return (
    <div className="mr-header">
      <HeaderLeft />
      <h1 className="title">
        <span>M</span>arkdown to <span>R</span>esume
      </h1>
      <HeaderRight />
    </div>
  );
}

export default Header;
