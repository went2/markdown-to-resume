import { createSlice } from "@reduxjs/toolkit";

const editorSlice = createSlice({
  name: "editor",
  initialState: {
    content: "nothing here~",
  },
  reducers: {
    updateContent(state, action) {
      state.content = action.payload;
      // console.log(state.content);
    },
  },
});

export const { updateContent } = editorSlice.actions;
export { editorSlice };
export default editorSlice.reducer;
