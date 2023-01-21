import React, { useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import styles from "./comments.module.scss";
import Skeleton from "react-loading-skeleton";
import isEmpty from "lodash/isEmpty";
import useToggle from "../../../../../../hooks/useToggle";
import { useDispatch } from "react-redux";
import { getComments } from "../../../../../../redux/slices/chat";

const Comments = ({ comments, loading, groupId, postId }) => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const handleToggle = () => {
    setShow(!show);
    if (!show) dispatch(getComments({ groupId, postId }));
  };

  return (
    <div className={styles.comments}>
      <div className={styles.toggle} role="button" onClick={handleToggle}>
        <p>comments</p>
        {show ? <BsChevronUp /> : <BsChevronDown />}
      </div>
      {show && (
        <div>
          {loading && isEmpty(comments) && <Skeleton count={4} height={15} />}
          {!loading && isEmpty(comments) && <p>No comments yet</p>}
          {comments.map((comment) => (
            <div key={comment.id}>
              <div className={styles.content}>
                <p className={styles.name}>{comment.userName}</p>
                <p className={styles.text}>{comment.text}</p>
              </div>
              <p className={styles.time}>{comment.time} ago</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Comments;
