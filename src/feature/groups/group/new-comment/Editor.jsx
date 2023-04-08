import EditorCapturePlugin from "components/lexical/editor-capture-plugin";
import React, { useState } from "react";
import { StyledContentEditable } from "./styled";
import { useSearchUser } from "../hooks/use-search-user";
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

const Editor = React.forwardRef(({ onSubmit, onChange }, ref) => {
  const [searchQuery, setSearchQuery] = useState("");
  const searchUserQuery = useSearchUser(searchQuery);

  const handleChange = (editorState, editor) => {
    const isComposing = editor.isComposing();
    const isEmpty = editorState.read($isRootTextContentEmptyCurry(isComposing, true));
    onChange(editorState.toJSON(), isEmpty);
  };

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <EditorCapturePlugin ref={ref} />
      <PlainTextPlugin contentEditable={<StyledContentEditable />} />
      <AutoLinkPlugin matchers={MATCHERS} />
      <MentionsPlugin options={searchUserQuery.data} onQueryChange={setSearchQuery} />
      <SubmitPlugin onSubmit={onSubmit} />
      <ClearEditorPlugin />
      <OnChangePlugin onChange={handleChange} />
    </LexicalComposer>
  );
});

export default Editor;
