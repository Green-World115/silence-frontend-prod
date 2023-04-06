import { useState } from "react";
import { IconButton, InputBase, Stack } from "@mui/material";
import React from "react";
import { InputContainer } from "../styled";
import * as chatApi from "api/chat";
import { useSnackbar } from "notistack";
import SendIcon from "@mui/icons-material/Send";
import Upload from "./Upload";
const NewMessage = ({ userId, chatGroupId }) => {
  const [value, setValue] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (e) => setValue(e.target.value);
  const handleSend = async () => {
    const { error } = await chatApi.sendMessage(value, null, userId, chatGroupId);
    if (error) enqueueSnackbar("Failed to send message", { variant: "error" });
    else setValue("");
  };

  const handleEnter = (e) => {
    if (e.key === "Enter" && !value.trimEnd()) handleSend();
  };

  return (
    <InputContainer>
      <InputBase fullWidth placeholder="Type message" value={value} onChange={handleChange} onKeyDown={handleEnter} />
      <Stack direction="row">
        <Upload />
        <IconButton color="primary" disabled={!value?.trim()} onClick={handleSend}>
          <SendIcon />
        </IconButton>
      </Stack>
    </InputContainer>
  );
};

export default NewMessage;
