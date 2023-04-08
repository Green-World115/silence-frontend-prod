import { IconButton, Stack } from "@mui/material";
import { CustomAvatar } from "components/custom-avatar";
import React, { useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { useUser } from "feature/auth/context";

import { useComment } from "../hooks/use-comment";
import imageUrls from "constants/image-urls";
import { useResponsive } from "hooks/useResponsive";
import Editor from "./Editor";
import { CLEAR_EDITOR_COMMAND } from "lexical";

const NewComment = ({ postId }) => {
  const [editor, setEditor] = useState({ editorState: null, isEmpty: true });
  const user = useUser();

  const editorRef = useRef();

  const { mobile } = useResponsive();
  const commentMutation = useComment(postId);

  const handleSubmit = (editorState = editor.editorState, isEmpty = editor.isEmpty) => {
    if (!isEmpty) {
      editorRef.current.dispatchCommand(CLEAR_EDITOR_COMMAND, undefined);
      commentMutation.mutate({ userId: user.id, postId, content: editorState });
    }
  };

  return (
    <Stack direction="row" spacing={2} alignItems="center">
      {!mobile && (
        <CustomAvatar name={user.firstName} src={user.avatar && `${imageUrls.AVATAR_BASE_URL}/${user.avatar}`} />
      )}

      <Stack direction="row" spacing={2} width="100%" alignItems="center">
        <Editor
          ref={editorRef}
          onChange={(editorState, isEmpty) => setEditor({ editorState, isEmpty })}
          onSubmit={handleSubmit}
        />
        <IconButton
          color="primary"
          onClick={() => handleSubmit()}
          disabled={editor.isEmpty}
          sx={{ width: "46px", height: "46px" }}
        >
          <Icon icon="material-symbols:send" fontSize={30} />
        </IconButton>
      </Stack>
    </Stack>
  );
};

export default NewComment;
