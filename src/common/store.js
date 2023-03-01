import { configureStore } from "@reduxjs/toolkit";
import editorReducer from "@/features/editor/redux/reducer.js";
import headerReducer from "@/features/header/redux/reducer.js";
import previewReducer from "@/features/preview/redux/reducer.js";

const store = configureStore({
  reducer: {
    editor: editorReducer,
    header: headerReducer,
    preview: previewReducer,
  },
});

export default store;
