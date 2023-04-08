import { useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { CLEAR_EDITOR_COMMAND, COMMAND_PRIORITY_LOW } from "lexical";
import { KEY_ENTER_COMMAND } from "lexical";
import { $isRootTextContentEmptyCurry } from "@lexical/text";

const SubmitPlugin = ({ onSubmit, component }) => {
  const [editor] = useLexicalComposerContext();

  const handleSubmit = () => {
    onSubmit(editor.getEditorState().toJSON());
    editor.dispatchCommand(CLEAR_EDITOR_COMMAND, undefined);
  };

  useEffect(() => {
    return editor.registerCommand(
      KEY_ENTER_COMMAND,
      (e) => {
        if (e?.key === "Enter") {
          const isComposing = editor.isComposing();
          const editorState = editor.getEditorState();
          const isEmpty = editorState.read($isRootTextContentEmptyCurry(isComposing, true));
          onSubmit(editorState.toJSON(), isEmpty);
        }
        return true;
      },
      COMMAND_PRIORITY_LOW
    );
  }, [editor]);

  if (component) return <>{component(handleSubmit)}</>;
  return null;
};

export default SubmitPlugin;
