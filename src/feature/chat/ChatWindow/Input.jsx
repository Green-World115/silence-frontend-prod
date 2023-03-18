import { useState } from "react";
import { IconButton, InputBase } from "@mui/material";
import React from "react";
import { InputContainer } from "./styled";
import { Icon } from "@iconify/react";
import * as chatApi from "api/chat";
import { useSnackbar } from "notistack";

const Input = ({ userId, chatGroupId }) => {
  const [value, setValue] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (e) => setValue(e.target.value);
  const handleSend = async () => {
    const { error } = await chatApi.sendMessage(value, null, userId, chatGroupId);
    if (error) enqueueSnackbar("Failed to send message", { variant: "error" });
    else setValue("");
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <InputContainer>
      <InputBase fullWidth placeholder="Type message" value={value} onChange={handleChange} onKeyDown={handleEnter} />
      <IconButton color="primary" disabled={!value?.trim()} onClick={handleSend}>
        <Icon icon="material-symbols:send" fontSize={30} />
      </IconButton>
    </InputContainer>
  );
};

export default Input;
