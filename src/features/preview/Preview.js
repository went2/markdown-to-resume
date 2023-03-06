import React, { useEffect } from "react";
import { connect } from "react-redux";

import "./Preview.less";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";

const Preview = (props) => {
  const { doc, css } = props;

  useEffect(() => {
    const head = document.head || document.getElementsByTagName("head");
    const style = document.createElement("style");
    head.appendChild(style);
    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
  }, [css]);

  return (
    <div className="rs-view__wrapper">
      <div className="rs-view__inner">
        <ReactMarkdown
          children={doc}
          remarkPlugins={[remarkGfm]}
          className="rs-page"
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    doc: state.editor.doc,
    css: state.editor.css,
  };
};

export default connect(mapStateToProps)(Preview);
