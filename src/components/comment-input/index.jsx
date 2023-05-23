import EditorCapturePlugin from "components/lexical/editor-capture-plugin";
import React, { useRef, useState } from "react";
import { useSearchUser } from "./use-search-user";
import { ClearEditorPlugin } from "@lexical/react/LexicalClearEditorPlugin";

import SubmitPlugin from "components/lexical/submit-plugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { MentionNode } from "components/lexical/mentions-plugin/MentionNode";
import { AutoLinkNode } from "@lexical/link";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { AutoLinkPlugin } from "@lexical/react/LexicalAutoLinkPlugin";
import MentionsPlugin from "components/lexical/mentions-plugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { $isRootTextContentEmptyCurry } from "@lexical/text";
import { Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { CLEAR_EDITOR_COMMAND } from "lexical";
import { InputContainer, Placeholder, Send, StyledContentEditable } from "./styled";

//TODO update regex to match any url
const URL_MATCHER =
  /((https?:\/\/(www\.)?)|(www\.))[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

const MATCHERS = [
  (text) => {
    const match = URL_MATCHER.exec(text);
    if (match === null) {
      return null;
    }
    const fullMatch = match[0];
    return {
      index: match.index,
      length: fullMatch.length,
      text: fullMatch,
      url: fullMatch.startsWith("http") ? fullMatch : `https://${fullMatch}`,
      attributes: { rel: "noopener", target: "_blank" },
    };
  },
];

const editorConfig = {
  onError(error) {
    throw error;
  },
  nodes: [MentionNode, AutoLinkNode],
};

const CommentInput = React.forwardRef(({ onSubmit, placeholder }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isEmpty, setIsEmpty] = useState(true);
  const editorRef = useRef();

  const searchUserQuery = useSearchUser(searchQuery);

  const checkEmpty = () => {
    const editor = editorRef.current;
    const isComposing = editor.isComposing();
    const editorState = editor.getEditorState();
    return editorState.read($isRootTextContentEmptyCurry(isComposing, true));
  };

  const handleChange = () => setIsEmpty(checkEmpty());

  const handleSubmit = () => {
    if (!checkEmpty()) {
      const editor = editorRef.current;
      const editorState = editor.getEditorState();
      editor.dispatchCommand(CLEAR_EDITOR_COMMAND, undefined);
      onSubmit(editorState);
    }
  };

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <EditorCapturePlugin ref={editorRef} />
      <InputContainer>
        <PlainTextPlugin
          contentEditable={<StyledContentEditable />}
          placeholder={
            <Placeholder>
              <Typography color="text.disabled">{placeholder || "Write a comment.."}</Typography>
            </Placeholder>
          }
        />
        <Send edge="end" disabled={isEmpty} color="primary" onClick={handleSubmit}>
          <SendIcon />
        </Send>
      </InputContainer>

      <AutoLinkPlugin matchers={MATCHERS} />
      <MentionsPlugin options={searchUserQuery.data} onQueryChange={setSearchQuery} />
      <SubmitPlugin onSubmit={handleSubmit} />
      <ClearEditorPlugin />
      <OnChangePlugin onChange={handleChange} />
    </LexicalComposer>
  );
});

export default CommentInput;
