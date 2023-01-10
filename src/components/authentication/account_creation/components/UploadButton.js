import React, { useRef } from "react";
import { FaArrowCircleUp } from "react-icons/fa";
import { Button } from "react-bootstrap";

const UploadButton = ({ onChange }) => {
  const ref = useRef(null);
  const handleUpload = () => ref.current.click();

  return (
    <Button onClick={handleUpload}>
      <input hidden type="file" ref={ref} onChange={onChange} />
      <div className="d-flex flex-row justify-content-center">
        <FaArrowCircleUp className="align-self-center me-3" size={25} />
        Upload
      </div>
    </Button>
  );
};

export default UploadButton;
