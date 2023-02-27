import { createSlice } from "@reduxjs/toolkit";
import { editorSlice } from "../../editor/redux/reducer";

const headerSlice = createSlice({
  name: "header",
  initialState: {
    file: null,
  },
  reducers: {},
});

export default headerSlice.reducer;
