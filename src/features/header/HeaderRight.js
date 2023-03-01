import React, { useCallback } from "react";

import html2canvas from "html2canvas";

const HeaderRight = () => {
  const exportHandler = useCallback(() => {
    // 手动获取预览内容的节点
    const previewEle = document.querySelector(".rs-view__inner");
    if (!previewEle) return;

    html2canvas(previewEle).then((canvas) => {
      console.log(canvas);
      // document.body.append(canvas);
    });
  }, []);

  return (
    <div>
      <button onClick={exportHandler}>导出</button>
    </div>
  );
};

export default HeaderRight;
