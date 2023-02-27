import React, { memo } from "react";
import Layout from "./base-ui/Layout/index.js";
import Header from "./features/header/Header.js";
import Editor from "./features/editor/Editor.js";
import Previewer from "./features/previewer/Previewer.js";

import "./App.less";

const App = memo(() => {
  return (
    <Layout>
      <Header></Header>
      <div className="mr-container">
        <Editor />
        <Previewer />
      </div>
    </Layout>
  );
});

export default App;
