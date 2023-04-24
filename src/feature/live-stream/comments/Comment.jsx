import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { CustomAvatar } from "components/custom-avatar";
import { CommentInfo, Content, StyledContentEditable } from "./styled";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { AutoLinkNode } from "@lexical/link";

import { MentionNode } from "components/lexical/mentions-plugin/MentionNode";
import { formatToNow } from "utils/date-formatter";
import config from "@config/index";

export const Comment = ({ name, content, createdAt, avatar }) => {
  return (
    <Stack direction="row" spacing={1}>
      <CustomAvatar sx={{ height: 32, width: 32 }} name={name} src={avatar && `${config.avatarBaseUrl}${avatar}`} />
      <Box width="100%">
        <Box display="flex" alignItems="center">
          <Content>
            <Typography variant="subtitle2" fontSize={13}>
              {name}
            </Typography>

            <LexicalComposer
              initialConfig={{ editorState: content, nodes: [MentionNode, AutoLinkNode], editable: false }}
            >
              <Box sx={{ width: "100%" }}>
                <PlainTextPlugin contentEditable={<StyledContentEditable />} />
              </Box>
            </LexicalComposer>
          </Content>
        </Box>
        <CommentInfo direction="row" spacing={1}>
          <Typography variant="caption" color="text.secondary" fontSize={11}>
            {formatToNow(createdAt)}
          </Typography>
        </CommentInfo>
      </Box>
    </Stack>
  );
};
export default Comment;
