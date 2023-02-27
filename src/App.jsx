import React, { memo } from "react";
import Layout from "./base-ui/Layout/index.js";
import Header from "./features/header/Header.js";

import Editor from "./features/editor/Editor.js";

const App = memo(() => {
  return (
    <Layout>
      <Header></Header>
      <Editor />
    </Layout>
  );
});

export default App;
