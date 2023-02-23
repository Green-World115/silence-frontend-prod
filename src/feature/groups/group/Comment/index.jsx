import { Paper, Stack, Typography } from "@mui/material";
import { CustomAvatar } from "components/custom-avatar";
import React from "react";
import { Content } from "./styled";

export const Comment = () => {
  return (
    <Stack direction="row" spacing={2}>
      <CustomAvatar name="test" />
      <div>
        <Content>
          <Typography variant="subtitle2">name</Typography>
          <Typography variant="body2" color="text.secondary">
            TESTa asdas asdasdas dasdas asd asdasdasd adasdas asdas asdasdas das as dasdashjdashjdgjajshdgahs
            ashjdgajhsdgahjsdg
          </Typography>
        </Content>
        <Typography variant="caption" color="text.secondary">
          2 hours
        </Typography>
      </div>
    </Stack>
  );
};
export default Comment;
