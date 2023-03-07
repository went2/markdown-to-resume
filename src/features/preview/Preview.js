import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";

import "./Preview.less";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";

const Preview = (props) => {
  const { doc, css } = props;
  const styleEle = useRef(null);

  useEffect(() => {
    if (!styleEle.current) {
      const head = document.head || document.getElementsByTagName("head");
      const style = document.createElement("style");
      head.appendChild(style);
      styleEle.current = style;
    }

    if (styleEle.current.styleSheet) {
      styleEle.current.styleSheet.cssText = css;
    } else {
      styleEle.current.appendChild(document.createTextNode(css));
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
