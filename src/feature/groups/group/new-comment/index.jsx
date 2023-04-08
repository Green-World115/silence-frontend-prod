import { IconButton, Stack } from "@mui/material";
import { CustomAvatar } from "components/custom-avatar";
import React, { useMemo, useState } from "react";
import { Icon } from "@iconify/react";
import { useUser } from "feature/auth/context";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { AutoLinkPlugin } from "@lexical/react/LexicalAutoLinkPlugin";
import { ClearEditorPlugin } from "@lexical/react/LexicalClearEditorPlugin";

import { AutoLinkNode } from "@lexical/link";

import MentionsPlugin from "components/lexical/mentions-plugin";
import { MentionNode } from "components/lexical/mentions-plugin/MentionNode";
import { useSearchUser } from "../hooks/use-search-user";
import { useComment } from "../hooks/use-comment";
import { StyledContentEditable } from "./styled";
import imageUrls from "constants/image-urls";
import { useResponsive } from "hooks/useResponsive";
import SubmitPlugin from "components/lexical/submit-plugin";

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

const NewComment = ({ postId }) => {
  const [editorState, setEditorState] = useState("");
  const user = useUser();
  const [searchText, setSearchText] = useState("");

  const { mobile } = useResponsive();
  const searchUserQuery = useSearchUser(searchText);
  const commentMutation = useComment(postId);

  const isEmpty = useMemo(
    () =>
      !editorState?.root?.children[0]?.children[0]?.text?.trim() &&
      editorState?.root?.children[0]?.children[0]?.type !== "autolink",
    [editorState]
  );
  const handleSubmit = (state) => {
    if (
      state?.root?.children[0]?.children[0]?.text?.trim() ||
      state?.root?.children[0]?.children[0]?.type === "autolink"
    )
      commentMutation.mutate({ userId: user.id, postId, content: state });
  };

  return (
    <Stack direction="row" spacing={2} alignItems="center">
      {!mobile && (
        <CustomAvatar name={user.firstName} src={user.avatar && `${imageUrls.AVATAR_BASE_URL}/${user.avatar}`} />
      )}
      <LexicalComposer initialConfig={editorConfig}>
        <Stack direction="row" spacing={2} width="100%" alignItems="center">
          <PlainTextPlugin contentEditable={<StyledContentEditable />} />
          <AutoLinkPlugin matchers={MATCHERS} />
          <MentionsPlugin options={searchUserQuery.data} onQueryChange={setSearchText} />
          <OnChangePlugin onChange={(e) => setEditorState(e.toJSON())} />
          <SubmitPlugin
            onSubmit={handleSubmit}
            component={(onSubmit) => (
              <IconButton color="primary" onClick={onSubmit} disabled={isEmpty} sx={{ width: "46px", height: "46px" }}>
                <Icon icon="material-symbols:send" fontSize={30} />
              </IconButton>
            )}
          />
          <ClearEditorPlugin />
        </Stack>
      </LexicalComposer>
    </Stack>
  );
};

export default NewComment;
