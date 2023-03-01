import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const options = {
  scale: 4,
  dpi: 300,
  backgroundColor: "#FFF",
  onclone: function (documentClone) {
    // documentClone.querySelector(".rs-view-page").style.transform = "scale(2)";
  },
};
export function exportPdf(selector, filename) {
  const ele = document.querySelector(selector);
  if (!ele) return;

  html2canvas(ele, options).then((canvas) => {
    const pdf = new jsPDF("p", "mm", "a4");
    const ctx = canvas.getContext("2d"),
      a4w = 210,
      a4h = 297, // A4 210mm x 297mm，四边可保留10mm的边距，显示区域190x277，这里不保留
      //按A4显示比例换算一页图像的像素高度
      imgHeight = Math.floor((a4h * canvas.width) / a4w);
    let renderedHeight = 0;

    while (renderedHeight < canvas.height) {
      let page = document.createElement("canvas");
      page.width = canvas.width;
      page.height = Math.min(imgHeight, canvas.height - renderedHeight); //内容可能不足一页
      // getImageData裁剪一页区域，画到创建的canvas对象中
      page
        .getContext("2d")
        .putImageData(
          ctx.getImageData(
            0,
            renderedHeight,
            canvas.width,
            Math.min(imgHeight, canvas.height - renderedHeight)
          ),
          0,
          0
        );

      // 添加图像到页面
      pdf.addImage(
        page.toDataURL("image/jpeg", 1.0),
        "JPEG",
        10,
        10,
        a4w,
        Math.min(a4h, (a4w * page.height) / page.width)
      );
      renderedHeight += imgHeight;
      if (renderedHeight < canvas.height) pdf.addPage(); // 如果后面还有内容，添加一个空页
      page = null;
    }

    pdf.save(filename);
  });
}

export function exportMd(stringData, filename) {
  const blob = new Blob([stringData], {
    type: "text/markdown",
  });

  // 生成 url 链接
  const objURL = URL.createObjectURL(blob);

  // 设为 a 元素的下载地址
  const aEle = document.createElement("a");
  aEle.href = objURL;
  aEle.download = filename + ".md";
  aEle.click();

  // 释放当前的 URL 对象
  URL.revokeObjectURL(objURL);
}
