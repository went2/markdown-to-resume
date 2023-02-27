import React from "react";

import "./index.less";
import "antd/dist/reset.css";

export default function Layout({ children }) {
  return <div className="mr-root">{children}</div>;
}
