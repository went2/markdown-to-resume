import React, { memo } from "react";
import { connect } from "react-redux";
import { updateDoc } from "./redux/reducer.js";
import useCodeMirror from "./hooks/useCodeMirror.js";
import { throttle } from "lodash";

import "github-markdown-css";
import "./Editor.less";

const Editor = memo((props) => {
  const { doc, updateDoc } = props;

  const handleDocChange = throttle((editorState) => {
    updateDoc(editorState.doc.toString());
  }, 200);

  const [refContainer] = useCodeMirror({
    initialDoc: doc,
    onChange: handleDocChange,
  });

  return <div className="rs-editor markdown-body" ref={refContainer}></div>;
});

const mapStateToProps = function (state) {
  return {
    doc: state.editor.doc,
  };
};

const mapDispatchToProps = (dispatch) => ({
  updateDoc: (newDoc) => dispatch(updateDoc(newDoc)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
