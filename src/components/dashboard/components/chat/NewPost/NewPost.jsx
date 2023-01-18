import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const NewPost = ({ open, onClose }) => {
  return (
    <Modal show={open} onHide={onClose}>
      <Modal.Header>
        <Modal.Title>New Post</Modal.Title>
      </Modal.Header>
      <Modal.Body></Modal.Body>
      <Modal.Footer>
        <Button variant="secondary">Cancel</Button>
        <Button variant="primary">Post</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewPost;
