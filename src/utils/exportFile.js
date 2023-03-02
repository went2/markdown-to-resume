import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "@/assets/font/shsc-normal.js";

const options = {
  scale: 4,
  dpi: 300,
  backgroundColor: "#FFF",
};
export function exportPdfFromCanvas(selector, filename) {
  const ele = document.querySelector(selector);
  if (!ele) return;

  let eleW = ele.offsetWidth;
  let eleH = ele.scrollHeight;
  let eleOffsetTop = ele.offsetTop; // 当前元素的外边框与最近定位元素的内边框的顶部的距离
  let eleOffsetLeft = ele.offsetLeft;
  console.log(eleW, eleH, eleOffsetTop, eleOffsetLeft);
  return;

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

export function exportPdfFromHtml(selector, filename) {
  const ele = document.querySelector(selector);
  if (!ele) return;

  const pdf = new jsPDF();

  pdf.setFont("shsc", "normal");
  // set css fontFamily to make custom font work with .html()
  // https://github.com/parallax/jsPDF/issues/2465
  ele.style.fontFamily = "shsc";

  pdf.html(ele, {
    callback: function (doc) {
      doc.setFont("shsc", "normal");
      doc.save(filename);
    },
    margin: [10, 10, 10, 10],
    width: 190,
    windowWidth: 675,
  });
}
