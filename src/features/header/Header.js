import React from "react";

import "./Header.less";

import HeaderLeft from "./HeaderLeft";

function Header() {
  return (
    <div className="mr-header-bar">
      <HeaderLeft />
    </div>
  );
}

export default Header;
