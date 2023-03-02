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

  splitPage(ele);
  return;
  html2canvas(ele, options).then((canvas) => {
    const pdf = new jsPDF("p", "mm", "a4");
    const ctx = canvas.getContext("2d"),
      a4w = 210,
      a4h = 297, // A4 210mm x 297mm，四边可保留10mm的边距，显示区域190x277，这里不保留
      //按A4显示比例换算一页图像的像素高度
      imgHeight = Math.floor((a4h * canvas.width) / a4w);
    let renderedHeight = 0;

    console.log("canvas width", canvas.width);

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

function splitPage(ele) {
  // 因为存在缩放，宽高统一采用 boundingClienRect 的数值，不和 offsetHeight 混用
  // boundingClienRect 不准确，还是应该采用 offsetHeight
  const eleBounding = ele.getBoundingClientRect();
  const eTop = eleBounding.top; // 容器元素距顶高度，用做基准，第一页的开始
  const pageHeight = ele.offsetWidth * (297 / 210); // 按照 A4 比例的 1 页的像素

  const eleList = ele.children;
  const nodesNum = eleList.length;

  let totalPage = Math.ceil(ele.offsetHeight / pageHeight);

  // 找出当前页第一个跨页且最深层级的子元素
  // 跨页的外层元素中有若干（嵌套的）子元素，有的跨页，有的不夸页，从中找到第一个跨页的子元素
  // 依次类推，直到没有子元素

  // 2页，需找 1 个跨页的最外层的元素即可
  let pageNum = 1; // 从第1页开始
  console.log("pageHeight", pageHeight);
  for (let i = 0; i < nodesNum; i++) {
    let node = eleList[i];
    if (isCrossPage(node, pageHeight, pageNum)) {
      console.log("找到跨页元素", node);
      break;
    }
  }
}

/**
 * 判断某个元素是否跨页
 * @param {HTMLElement} el 元素
 * @param {number} pageHeight 页高
 * @param {number} currentPage 元素所在当前页数
 */
function isCrossPage(el, pageHeight, currentPage) {
  const top = el.offsetTop,
    height = el.offsetHeight,
    totalPH = pageHeight * currentPage;
  const isCross = top < totalPH && top + height > totalPH;

  return isCross;
}
