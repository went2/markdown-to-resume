import React, { memo, useCallback, useState } from "react";
import Header from "./features/header/Header.js";
import Editor from "./features/editor/Editor.js";
import Preview from "./features/preview/Preview.js";

import SplitPane from "react-split-pane";

import "./App.less";

const App = memo(() => {
  return (
    <main>
      <Header></Header>
      <SplitPane split="vertical">
        <Editor />
        <Preview />
      </SplitPane>
    </main>
  );
});

export default App;
