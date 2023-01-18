import React from "react";
import styles from "./comment.module.scss";
const Comment = ({ userName, comment }) => {
  return (
    <div className={styles.container}>
      <p className={styles.name}>{userName}</p>
      <p className={styles.text}>{comment}</p>
    </div>
  );
};

export default Comment;
