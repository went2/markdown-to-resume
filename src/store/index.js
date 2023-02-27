import { configureStore } from "@reduxjs/toolkit";
import editorReducer from "./modules/editor";
import headerReducer from "./modules/header.js";

const store = configureStore({
  reducer: {
    editor: editorReducer,
    header: headerReducer,
  },
});

export default store;
