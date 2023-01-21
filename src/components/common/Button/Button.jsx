import React from "react";
import BSButton from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import classNames from "classnames";
import styles from "./button.module.scss";
const Button = ({ loading, disabled, children, ...props }) => {
  return (
    <BSButton disabled={disabled || loading} {...props}>
      <span className={styles.content}>
        {loading && (
          <span className={styles.spinner}>
            <Spinner as="span" size="sm" role="status" aria-hidden="true" />
          </span>
        )}
        <span className={classNames({ [styles.titleHidden]: loading })}>{children}</span>
      </span>
    </BSButton>
  );
};

export default Button;
