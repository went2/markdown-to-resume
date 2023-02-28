import React from "react";
import { connect } from "react-redux";

import "./Preview.less";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";

const Preview = (props) => {
  const { doc } = props;
  return (
    <div className="rs-view">
      <ReactMarkdown children={doc} remarkPlugins={[remarkGfm]} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    doc: state.editor.doc,
  };
};

export default connect(mapStateToProps)(Preview);
