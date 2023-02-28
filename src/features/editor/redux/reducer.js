import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { unified } from "unified";
import remarkParse from "remark-parse/lib";
import remarkRehype from "remark-rehype";
import rehypeDocument from "rehype-document";
import rehypeFormat from "rehype-format";
import rehypeStringify from "rehype-stringify";

const initialState = {
  content: "fill me with markdown file to process",
  html: "",
  doc: "# select a markdown file and get start~", // marddown string
};

export const md2Html = createAsyncThunk("editor/md2html", (content) => {
  return new Promise((resolve, reject) => {
    unified()
      .use(remarkParse)
      .use(remarkRehype)
      .use(rehypeDocument)
      .use(rehypeFormat)
      .use(rehypeStringify)
      .process(content)
      .then((res) => {
        resolve(res.value);
      })
      .catch((err) => {
        throw Error(err);
      });
  });
});

const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    updateContent(state, action) {
      state.content = action.payload;
    },
    updateDoc(state, action) {
      state.doc = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(md2Html.fulfilled, (state, action) => {
      state.html = action.payload;
    });
  },
});

export const { updateContent, updateDoc } = editorSlice.actions;
export { editorSlice };
export default editorSlice.reducer;
