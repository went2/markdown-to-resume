import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export function exportPdfFromCanvas(selector, filename) {
  const ele = document.querySelector(selector);
  if (!ele) return;

  const options = {
    scale: 3,
    dpi: 300,
    backgroundColor: "#FFF",
    onclone(clonedDocument) {
      let target = clonedDocument.querySelector(selector);
      target.style.transform = "scale(1)";
      splitPage(target);
    },
  };

  html2canvas(ele, options).then((canvas) => {
    const pdf = new jsPDF("p", "mm", "a4");
    const ctx = canvas.getContext("2d"),
      a4w = 200,
      a4h = 287, // A4 210mm x 297mm，四边可保留边距如5mm，显示区域200x287，这里不保留
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
        5,
        5,
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

export function exportPdfFromWindow(selector, filename) {
  const ele = document.querySelector(selector);
  if (!ele) return;
  var eleContents = ele.innerHTML;
  console.log(eleContents);
  var printWindow = window.open("", "", "height=1000,width=1000");
  printWindow.document.write("<html><head><title>Printed Contents</title>");
  printWindow.document.write("</head><body >");
  printWindow.document.write(eleContents);
  printWindow.document.write("</body></html>");
  printWindow.document.close();
  printWindow.onafterprint = () => {
    printWindow.close();
  };
  printWindow.print();
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
  // 元素的宽高统一采用 offsetWidth 与 offsetHeight
  // 不用 getBoundingClientRect 的数值，因为它受元素缩放的影响，不固定
  const pageHeight = ele.offsetWidth * (297 / 210); // 按照 A4 比例的 1 页的像素

  // 找出哪个元素跨页的算法：找出当前页的第一个跨页父元素中最深层级的子元素
  let totalPage = Math.ceil(ele.offsetHeight / pageHeight);
  let eleCrossed = findFirstCrossedChild(ele, pageHeight, totalPage);

  insertBlackBeforeEles(eleCrossed, pageHeight);
}

/**
 * 处理跨页元素(们)，在它的前面插入一个有高度的空白 div，将它挤到下一页
 * @param {HTMLElement[]} eleArr
 */
function insertBlackBeforeEles(eleArr, pageHeight) {
  eleArr.forEach((ele, i) => {
    let newNode = document.createElement("div");
    newNode.className = "blank-placeholder";
    newNode.style.background = "white";
    newNode.style.width = "100%";
    newNode.style.height =
      ele.offsetTop + ele.offsetHeight - pageHeight * (i + 1) + "px";

    let parent = ele.parentNode;
    parent.insertBefore(newNode, ele);
  });
}

/**
 * 深度搜索，找到跨页的叶子元素。返回数组，第1个元素表示它跨了第1-2页，第2个元素表示它跨了第2-3页
 * @param {HTMLElement} root 根元素
 * @param {number} pageHeight 页高
 * @param {number} totalPage 总页数
 */
function findFirstCrossedChild(root, pageHeight, totalPage) {
  // 名称说明, root: 整个页面的容器，parent: root 下的子元素，child: parent 下嵌套的子元素
  const maxCrossedEles = totalPage - 1; // 2 页要找 1 个跨页元素
  if (maxCrossedEles <= 0) return;
  let crossedChildrenNodes = [];

  let currentPage = 1; // 当前正在处理页的页码，从1开始

  let parentList = root.children;
  let parentLen = parentList.length;
  if (!parentLen) return;

  // 控制 parentList 的搜索
  for (let i = 0; i < parentLen; i++) {
    let parentNode = parentList[i];

    if (isCrossPage(parentNode, pageHeight, currentPage)) {
      // console.log("找到跨页父元素", parentNode);

      let crossedChild = findDeepCrossedChild(parentNode);
      crossedChildrenNodes.push(crossedChild);

      currentPage++;
    }
  }
  return crossedChildrenNodes;

  function findDeepCrossedChild(node) {
    let childList = node.children;
    let len = childList.length;
    if (len) {
      for (let i = 0; i < len; i++) {
        let childNode = childList[i];
        if (isCrossPage(childNode, pageHeight, currentPage)) {
          return findDeepCrossedChild(childNode);
        }
      }
    } else {
      // 无子元素，当前元素即层级最深的跨页元素
      return node;
    }
  }
}

/**
 * 判断某个元素是否跨页
 * @param {HTMLElement} el 元素
 * @param {number} pageHeight 页高
 * @param {number} currentPage 元素所在当前页数，从1开始
 */
function isCrossPage(el, pageHeight, currentPage) {
  // 本项目中元素的 offsetTop 为它的上外边框到容器内边框的距离
  const top = el.offsetTop,
    height = el.offsetHeight,
    totalPH = pageHeight * currentPage;
  const isCross = top < totalPH && top + height > totalPH;

  return isCross;
}
