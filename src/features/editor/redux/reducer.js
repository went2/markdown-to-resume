import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { unified } from "unified";
import remarkParse from "remark-parse/lib";
import remarkRehype from "remark-rehype";
import rehypeDocument from "rehype-document";
import rehypeFormat from "rehype-format";
import rehypeStringify from "rehype-stringify";

const initialState = {
  content: "nothing here~",
  html: "nothing here either",
};

export const md2Html = createAsyncThunk("editor/md2html", (content) => {
  return new Promise((resolve, reject) => {
    // compile markdown string to html
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

      // compile markdown string to html
      // unified()
      //   .use(remarkParse)
      //   .use(remarkRehype)
      //   .use(rehypeDocument)
      //   .use(rehypeFormat)
      //   .use(rehypeStringify)
      //   .process(state.content)
      //   .then((res) => {
      //     state.html = res.value;
      //     console.log(state.html);
      //   });
    },
  },
  extraReducers:
    // {
    //   [md2Html.fulfilled]: (state, action) => {
    //     console.log("fullfill", action.payload);
    //     state.html = action.payload;
    //   },
    // },

    (builder) => {
      builder.addCase(md2Html.fulfilled, (state, action) => {
        state.html = action.payload;
      });
    },
});

export const { updateContent } = editorSlice.actions;
export { editorSlice };
export default editorSlice.reducer;
