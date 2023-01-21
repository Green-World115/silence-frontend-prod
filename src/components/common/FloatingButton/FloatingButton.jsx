import React from "react";
import Button from "react-bootstrap/Button";
import styles from "./floatingButton.module.scss";
const FloatingButton = ({ children, ...props }) => {
  return (
    <Button className={styles.button} {...props}>
      {children}
    </Button>
  );
};

export default FloatingButton;
