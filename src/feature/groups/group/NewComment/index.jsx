import { Box, IconButton, Stack } from "@mui/material";
import { CustomAvatar } from "components/custom-avatar";
import React, { useMemo, useState } from "react";
import { Icon } from "@iconify/react";
import { useUser } from "feature/auth/context";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";

import MentionsPlugin from "components/mentions-plugin";
import { MentionNode } from "components/mentions-plugin/MentionNode";
import { useSearchUser } from "../use-search-user";
import { useComment } from "../use-comment";
import { InputContainer, StyledContentEditable } from "./styled";

const editorConfig = {
  onError(error) {
    throw error;
  },
  nodes: [MentionNode],
};

const NewComment = ({ postId }) => {
  const [editorState, setEditorState] = useState("");
  const user = useUser();
  const [searchText, setSearchText] = useState("");

  const searchUserQuery = useSearchUser(searchText);
  const commentMutation = useComment(postId);

  const isEmpty = useMemo(() => !editorState?.root?.children[0]?.children[0]?.text?.trim(), [editorState]);
  const handleSubmit = () => commentMutation.mutate({ userId: user.id, postId, content: JSON.stringify(editorState) });

  const handleEnter = (e) => {
    if (e.key === "Enter" && !isEmpty) handleSubmit();
  };

  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <CustomAvatar name={user.firstName} />
      <LexicalComposer initialConfig={editorConfig}>
        <InputContainer>
          <PlainTextPlugin contentEditable={<StyledContentEditable onKeyDown={handleEnter} />} />
          <MentionsPlugin options={searchUserQuery.data} onQueryChange={setSearchText} />
          <OnChangePlugin onChange={(e) => setEditorState(e.toJSON())} />
        </InputContainer>
      </LexicalComposer>

      <Box sx={{ minWidth: 2 }}>
        <IconButton color="primary" disabled={isEmpty} onClick={handleSubmit}>
          <Icon icon="material-symbols:send" fontSize={30} />
        </IconButton>
      </Box>
    </Stack>
  );
};

export default NewComment;
