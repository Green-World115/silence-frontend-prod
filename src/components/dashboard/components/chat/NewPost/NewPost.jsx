import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import * as chatApi from "../../../../../api/chat";

const NewPost = ({ open, groupId, userId, userName, onClose, onSuccess }) => {
  const [text, setText] = useState("");
  const handleChange = (e) => setText(e.target.value);

  const handleSubmit = async () => {
    try {
      await chatApi.addPost(text, [], userId, userName, groupId);
      onSuccess();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal show={open} onHide={onClose}>
      <Modal.Header>
        <Modal.Title>New Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control type="text" placeholder="Write a something" as="textarea" rows={3} onChange={handleChange} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" disabled={!text} onClick={handleSubmit}>
          Post
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewPost;
