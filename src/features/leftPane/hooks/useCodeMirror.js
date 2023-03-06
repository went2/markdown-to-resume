import { useEffect, useRef, useState } from "react";
import { EditorState } from "@codemirror/state";
import {
  drawSelection,
  EditorView,
  highlightSpecialChars,
  keymap,
} from "@codemirror/view";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { css } from "@codemirror/lang-css";
import { defaultKeymap, history } from "@codemirror/commands";
import { languages } from "@codemirror/language-data";
import { minimalSetup } from "codemirror";

const commonExtensions = [
  highlightSpecialChars(),
  history(),
  drawSelection(),
  keymap.of(defaultKeymap),
];

const langExtensionMap = {
  markdown: markdown({
    base: markdownLanguage,
    codeLanguages: languages,
    addKeymap: true,
  }),
  css: css(),
};

const useCodeMirror = ({ onChange, initialDoc, lang = "markdown" }) => {
  const refContainer = useRef(null);
  const [editorView, setEditorView] = useState();

  useEffect(() => {
    if (!refContainer.current) return;

    const startState = EditorState.create({
      doc: initialDoc,
      extensions: [
        ...commonExtensions,

        langExtensionMap[lang],
        minimalSetup,
        EditorView.lineWrapping,
        EditorView.updateListener.of((update) => {
          if (update.changes) {
            onChange && onChange(update.state);
          }
        }),
      ],
    });

    const view = new EditorView({
      state: startState,
      parent: refContainer.current,
    });

    setEditorView(view);

    return () => {
      view.destroy();
    };
  }, []);

  return [refContainer, editorView];
};

export default useCodeMirror;
