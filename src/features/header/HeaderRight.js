import React, { useCallback } from "react";

import exportPdf from "@/utils/pdf";

const HeaderRight = () => {
  const exportHandler = useCallback(() => {
    // 手动获取预览内容的节点
    exportPdf(".rs-view-page");
  }, []);

  return (
    <div>
      <button onClick={exportHandler}>导出</button>
    </div>
  );
};

export default HeaderRight;
