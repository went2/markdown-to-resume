import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { unified } from "unified";
import remarkParse from "remark-parse/lib";
import remarkRehype from "remark-rehype";
import rehypeDocument from "rehype-document";
import rehypeFormat from "rehype-format";
import rehypeStringify from "rehype-stringify";

const initialState = {
  doc: "", // markdown string
  filename: "",
  css: ".rs-view-page { h1 { color: red; } }", // css string
  isMdEditing: true,
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

export const readFile = createAsyncThunk("editor/readFile", (file) => {
  return new Promise((resolve, reject) => {
    const filename = file.name.replace(".md", "");
    let reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function () {
      resolve({
        doc: reader.result,
        filename,
      });
    };
  });
});

const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    updateDoc(state, action) {
      state.doc = action.payload;
    },
    changeMdEditing(state) {
      state.isMdEditing = !state.isMdEditing;
    },
    updateCss(state, action) {
      state.css = action.payload;
      console.log("updateCss", state.css);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(md2Html.fulfilled, (state, action) => {
        state.html = action.payload;
      })
      .addCase(readFile.fulfilled, (state, action) => {
        state.doc = action.payload.doc;
        state.filename = action.payload.filename;
      });
  },
});

export const { updateDoc, changeMdEditing, updateCss } = editorSlice.actions;
export { editorSlice };
export default editorSlice.reducer;
