import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import * as chatApi from "../../../../../api/chat";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../../redux/slices/user";
import Button from "../../../../common/Button";

const NewGroup = ({ open, onClose, onSuccess }) => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setText(e.target.value);

  const handleSubmit = async () => {};

  return (
    <Modal show={open} onHide={onClose} centered>
      <Modal.Header>
        <Modal.Title>New Group</Modal.Title>
      </Modal.Header>
      <Modal.Body></Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" disabled={!text} onClick={handleSubmit} loading={loading}>
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewGroup;
