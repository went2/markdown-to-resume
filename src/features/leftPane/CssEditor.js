import React, { memo } from "react";
import { connect } from "react-redux";
import { updateCss } from "./redux/reducer.js";
import useCodeMirror from "./hooks/useCodeMirror.js";
import { debounce } from "lodash";

// import "github-markdown-css";
import "./Editor.less";

const Editor = memo((props) => {
  const { css, updateCss } = props;

  const handleDocChange = debounce((editorState) => {
    updateCss(editorState.doc.toString());
  }, 200);

  const [refContainer] = useCodeMirror({
    initialDoc: css,
    onChange: handleDocChange,
    lang: "css",
  });

  return <div className="rs-editor editor-body" ref={refContainer}></div>;
});

const mapStateToProps = function (state) {
  return {
    css: state.editor.css,
  };
};

const mapDispatchToProps = (dispatch) => ({
  updateCss: (newCss) => dispatch(updateCss(newCss)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
