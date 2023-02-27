import { useEffect, useRef, useState } from "react";
import { EditorState } from "@codemirror/state";
import { EditorView, keymap } from "@codemirror/view";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { basicSetup } from "codemirror";
import { defaultKeymap } from "@codemirror/commands";
import { languages } from "@codemirror/language-data";

const useCodeMirror = ({ onChange, initialDoc }) => {
  const refContainer = useRef(null);
  const [editorView, setEditorView] = useState();

  useEffect(() => {
    if (!refContainer.current) return;
    const startState = EditorState.create({
      doc: initialDoc,
      extensions: [
        basicSetup,
        keymap.of(defaultKeymap),
        markdown({
          base: markdownLanguage,
          codeLanguages: languages,
          addKeymap: true,
        }),
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
  }, [refContainer]);

  return [refContainer, editorView];
};

export default useCodeMirror;
