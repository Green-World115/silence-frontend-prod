import React, { useState } from "react";
import { Button, Form, Stack } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../../../../../redux/slices/user";
import * as chatApi from "../../../../../../api/chat";
import { getComments } from "../../../../../../redux/slices/chat";
const Input = ({ groupId, postId }) => {
  const [input, setInput] = useState("");
  const user = useSelector(selectUser);

  const dispatch = useDispatch();

  const handleChangeInput = (e) => setInput(e.target.value);

  const handleSubmitComment = async () => {
    try {
      await chatApi.addComment(input, user.id, user.name, groupId, postId);
      setInput("");
      dispatch(getComments({ groupId, postId }));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Stack direction="horizontal" gap={2}>
      <Form.Control type="text" size="sm" placeholder="Write a comment" value={input} onChange={handleChangeInput} />
      <Button size="sm" onClick={handleSubmitComment} disabled={!input}>
        send
      </Button>
    </Stack>
  );
};

export default Input;
