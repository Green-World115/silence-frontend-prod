import React, { useState } from "react";
import { Form, Stack, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../../../../../redux/slices/user";
import * as chatApi from "../../../../../../api/chat";
import { getComments } from "../../../../../../redux/slices/chat";
import Button from "../../../../../common/Button/Button";
import { BsCursorFill } from "react-icons/bs";

const Input = ({ groupId, postId }) => {
  const [input, setInput] = useState("");
  const user = useSelector(selectUser);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleChangeInput = (e) => setInput(e.target.value);

  const handleSubmitComment = async () => {
    setLoading(true);
    try {
      await chatApi.addComment(input, user.id, user.name, groupId, postId);
      setInput("");
      dispatch(getComments({ groupId, postId }));
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  return (
    <Stack direction="horizontal" gap={2}>
      <Form.Control type="text" size="sm" placeholder="Write a comment" value={input} onChange={handleChangeInput} />
      <Button size="sm" onClick={handleSubmitComment} disabled={!input} loading={loading}>
        <BsCursorFill />
      </Button>
    </Stack>
  );
};

export default Input;
