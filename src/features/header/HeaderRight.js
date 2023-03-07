import React, { useCallback } from "react";
import "./HeaderRight.less";
import { connect } from "react-redux";

import { exportMd, exportPdfFromWindow } from "@/utils/exportFile";

const HeaderRight = (props) => {
  const { filename, doc, css } = props;
  const exportPdfHandler = useCallback(() => {
    exportPdfFromWindow(".rs-view__inner", filename, css);
  }, [filename, css]);

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
    css: state.editor.css,
  };
};

export default connect(mapStateToProps)(HeaderRight);
