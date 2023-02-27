import React, { useCallback, useState } from "react";
import { connect } from "react-redux";

import "./Editor.less";

function Editor(props) {
  const { content } = props;
  return (
    <div className="rs-editor">
      <textarea value={content}></textarea>
    </div>
  );
}

const mapStateToProps = function (state) {
  return {
    content: state.editor.content,
  };
};

export default connect(mapStateToProps)(Editor);
