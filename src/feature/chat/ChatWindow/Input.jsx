import { IconButton, InputBase } from "@mui/material";
import React from "react";
import { InputContainer } from "./styled";
import SendIcon from "@mui/icons-material/Send";
const Input = () => {
  return (
    <InputContainer>
      <InputBase fullWidth placeholder="Type message" />
      <IconButton size="small">
        <SendIcon />
      </IconButton>
    </InputContainer>
  );
};

export default Input;
