import React, { useCallback } from "react";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const HeaderRight = () => {
  const exportHandler = useCallback(() => {
    // 手动获取预览内容的节点
    const previewEle = document.querySelector(".rs-view-page");
    if (!previewEle) return;

    html2canvas(previewEle).then((canvas) => {
      const a4Ratio = 1123 / 794;
      // total image width and height
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      console.log("canvas", canvasWidth, canvasHeight);

      // a4 的 1 页映射到 html 的 1 页高度
      const pageHeight = canvasWidth * a4Ratio;

      let leftHeight = canvasHeight;
      let position = 0;

      const imageWidth = 794;
      // html 图片缩放到 a4 大小的总高度
      const iamgeHeight = (imageWidth / canvasWidth) * canvasHeight;

      const pageData = canvas.toDataURL("image/jpeg", 1.0);
      const pdf = new jsPDF({ unit: "pt" });

      if (leftHeight < pageHeight) {
        pdf.addImage(pageData, "JPEG", 0, 0, imageWidth, iamgeHeight);
      } else {
        while (leftHeight > 0) {
          pdf.addImage(pageData, "JPEG", 0, position, imageWidth, iamgeHeight);
          leftHeight -= pageHeight;
          position -= 1123;

          if (leftHeight > 0) pdf.addPage();
        }
      }

      pdf.save("test.pdf");
    });
  }, []);

  return (
    <div>
      <button onClick={exportHandler}>导出</button>
    </div>
  );
};

export default HeaderRight;
