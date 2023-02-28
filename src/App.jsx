import React, { memo } from "react";
import Header from "./features/header/Header.js";
import Editor from "./features/editor/Editor.js";
import Preview from "./features/preview/Preview.js";

import SplitPane from "react-split-pane";

import "./App.less";
import { connect } from "react-redux";

const App = memo(({ doc }) => {
  return (
    <main>
      <Header></Header>
      <SplitPane split="vertical">
        {doc ? <Editor /> : <div>drag a file to start</div>}
        <Preview />
      </SplitPane>
    </main>
  );
});

const mapStateToProps = function (state) {
  return {
    doc: state.editor.doc,
  };
};

export default connect(mapStateToProps)(App);
