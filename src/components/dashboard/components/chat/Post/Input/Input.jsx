import React from "react";
import { Button, Form, Stack } from "react-bootstrap";

export const Input = () => {
  return (
    <Stack direction="horizontal" gap={2}>
      <Form.Control type="text" size="sm" placeholder="Write a comment" />
      <Button size="sm">send</Button>
    </Stack>
  );
};
