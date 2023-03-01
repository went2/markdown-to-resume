import React, { memo } from "react";
import Header from "./features/header/Header.js";
import Editor from "./features/editor/Editor.js";
import Preview from "./features/preview/Preview.js";

import SplitPane from "react-split-pane";
import UploadArea from "./features/editor/UploadArea.js";

import "./App.less";
import { connect } from "react-redux";

const App = memo(({ doc }) => {
  return (
    <div className="app-container">
      <Header></Header>
      <main>
        <SplitPane split="vertical">
          {doc ? <Editor /> : <UploadArea />}
          {doc ? (
            <Preview />
          ) : (
            <div className="preview-placeholder">预览区（当前无内容）</div>
          )}
        </SplitPane>
      </main>
    </div>
  );
});

const mapStateToProps = function (state) {
  return {
    doc: state.editor.doc,
  };
};

export default connect(mapStateToProps)(App);
