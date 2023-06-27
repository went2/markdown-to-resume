// 打开窗口并打印
// https://stackoverflow.com/questions/18191893/generate-pdf-from-html-in-div-using-javascript
export function exportPdfFromWindow(selector, filename, cssText) {
  const ele = document.querySelector(selector);
  if (!ele) return;
  var eleContents = ele.innerHTML;
  var printWindow = window.open("", "", "height=1000,width=1000");
  printWindow.document.write(`<html><head><title>${filename}</title>`);
  printWindow.document.write("</head><body>");
  printWindow.document.write(eleContents);
  printWindow.document.write("</body></html>");
  // add style
  const head = printWindow.document.head;
  const style = document.createElement("style");
  head.appendChild(style);
  if (style.styleSheet) {
    style.styleSheet.cssText = cssText;
  } else {
    style.appendChild(document.createTextNode(cssText));
  }
  printWindow.document.close();

  printWindow.onafterprint = () => {
    printWindow.close();
    printWindow.onafterprint = null;
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
