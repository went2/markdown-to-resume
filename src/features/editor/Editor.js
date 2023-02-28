import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { updateDoc } from "./redux/reducer.js";
import useCodeMirror from "./hooks/useCodeMirror.js";
import { throttle } from "lodash";

import "./Editor.less";

function Editor(props) {
  const { doc, updateDoc } = props;

  const handleDocChangeRaw = (editorState) => {
    // console.log("code change", editorState);
    const newDoc = editorState.doc.toString();
    updateDoc(newDoc);
  };
  const throttledHandler = throttle(handleDocChangeRaw, 200);
  const handleDocChange = useCallback(throttledHandler, [throttledHandler]);

  const [refContainer, editorView] = useCodeMirror({
    initialDoc: doc,
    onChange: handleDocChange,
  });

  useEffect(() => {
    if (editorView) {
    } else {
      // loading editor
    }
  }, [editorView]);

  return <div className="rs-editor" ref={refContainer}></div>;
}

const mapStateToProps = function (state) {
  return {
    doc: state.editor.doc,
  };
};

const mapDispatchToProps = (dispatch) => ({
  updateDoc: (newDoc) => dispatch(updateDoc(newDoc)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
