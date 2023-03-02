import React, { useCallback } from "react";
import "./HeaderRight.less";
import { connect } from "react-redux";

import {
  exportPdfFromCanvas,
  exportMd,
  exportPdfFromHtml,
} from "@/utils/exportFile";

const HeaderRight = (props) => {
  const { filename, doc } = props;
  const exportPdfHandler = useCallback(() => {
    // 获取预览内容的节点
    exportPdfFromCanvas(".rs-view-page", filename);
  }, [filename]);

  const exportMdhandler = useCallback(() => {
    exportMd(doc, filename);
  }, [doc, filename]);

  return (
    <div>
      <button className="export-btn" onClick={exportMdhandler}>
        导出MD
      </button>
      <button className="export-btn" onClick={exportPdfHandler}>
        导出PDF
      </button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    filename: state.editor.filename,
    doc: state.editor.doc,
  };
};

export default connect(mapStateToProps)(HeaderRight);
