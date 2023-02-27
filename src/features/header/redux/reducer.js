import { createSlice } from "@reduxjs/toolkit";
import { editorSlice } from "../../editor/redux/reducer";

const headerSlice = createSlice({
  name: "header",
  initialState: {
    file: null,
  },
  reducers: {
    // 解析file文件
    uploadFile(state, action) {
      let reader = new FileReader();
      reader.readAsText(action.payload);

      reader.onload = function () {
        const content = reader.result;
        editorSlice.actions.updateContent(content);
      };
    },
  },
});

export const { uploadFile } = headerSlice.actions;
export default headerSlice.reducer;
