import React, { useCallback, useState } from "react";
import { connect } from "react-redux";
import { updateContent, md2Html } from "./redux/reducer.js";
import useCodeMirror from "./hooks/useCodeMirror.js";

import "./Editor.less";

function Editor(props) {
  const { content, updateContent, convertMd2Html } = props;
  const [doc, setDoc] = useState("# hello world! \n");
  const handleDocChange = useCallback((newDoc) => {
    setDoc(newDoc);
  }, []);

  const [refContainer, editorView] = useCodeMirror({
    initialDoc: doc,
    onChange: handleDocChange,
  });

  const handleInputChange = useCallback(
    (evt) => {
      updateContent(evt.target.value);
      convertMd2Html(evt.target.value);
    },
    [updateContent, convertMd2Html]
  );

  return (
    <div className="rs-editor">
      <textarea value={content} onChange={handleInputChange}></textarea>
      <div ref={refContainer}></div>
    </div>
  );
}

const mapStateToProps = function (state) {
  return {
    content: state.editor.content,
  };
};

const mapDispatchToProps = (dispatch) => ({
  updateContent: (content) => dispatch(updateContent(content)),
  convertMd2Html: (content) => dispatch(md2Html(content)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
