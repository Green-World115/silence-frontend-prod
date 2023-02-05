import { useState } from "react";
import { IconButton, InputBase } from "@mui/material";
import React from "react";
import { InputContainer } from "./styled";
import SendIcon from "@mui/icons-material/Send";
import * as chatApi from "api/chat";
import { useSnackbar } from "notistack";
const Input = ({ userId, conversationId }) => {
  const [value, setValue] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (e) => setValue(e.target.value);
  const handleSend = async () => {
    const { error } = await chatApi.sendMessage(value, null, userId, conversationId);
    if (error) enqueueSnackbar("Failed to send message", { variant: "error" });
    else setValue("");
  };

  return (
    <InputContainer>
      <InputBase fullWidth placeholder="Type message" value={value} onChange={handleChange} />
      <IconButton size="small" onClick={handleSend}>
        <SendIcon />
      </IconButton>
    </InputContainer>
  );
};

export default Input;
