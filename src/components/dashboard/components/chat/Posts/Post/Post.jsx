import Card from "react-bootstrap/Card";
import styles from "./post.module.scss";
import classNames from "classnames";
import Comments from "../Comments";
import useToggle from "../../../../../../hooks/useToggle";
import Input from "../Input";

function Post({ id, userName, time, text, comments, commentsLoading, groupId }) {
  return (
    <Card className={styles.container}>
      <Card.Body>
        <div className={styles.user}>
          <p className={classNames("h6", styles.name)}>{userName}</p>
          <p className={styles.date}>{time} ago</p>
        </div>
        <Card.Text>{text}</Card.Text>
        <hr className={styles.divider} />
        <Comments comments={comments} loading={commentsLoading} postId={id} groupId={groupId} />
        <Input postId={id} groupId={groupId} />
      </Card.Body>
    </Card>
  );
}

export default Post;
