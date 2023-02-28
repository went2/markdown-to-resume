import React from "react";

import "./Header.less";

import HeaderLeft from "./HeaderLeft";

function Header() {
  return (
    <div className="mr-header">
      <HeaderLeft />
      <h1 className="title">
        <span>M</span>arkdown to <span>R</span>esume
      </h1>
      <div>
        header right <button>导出</button>
      </div>
    </div>
  );
}

export default Header;
