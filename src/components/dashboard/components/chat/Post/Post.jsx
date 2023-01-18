import Card from "react-bootstrap/Card";
import styles from "./post.module.scss";
import Form from "react-bootstrap/Form";
import { Button, Stack } from "react-bootstrap";
import classNames from "classnames";
import Comment from "./Comment";
import { Input } from "./Input/Input";

function Post({ user, time, text }) {
  return (
    <Card className={styles.container}>
      <Card.Body>
        <div className={styles.user}>
          <p className={classNames("h6", styles.name)}>{user}</p>
          <p className={styles.date}>{time}</p>
        </div>
        <Card.Text>{text}</Card.Text>
        <hr className={styles.divider} />
        <div className={styles.comments}>
          <p>comments</p>
          <div>
            <Comment userName="Mike" comment="Thanks" />
            <Comment userName="David" comment="Thanks" />
          </div>
        </div>
        <Input />
      </Card.Body>
    </Card>
  );
}

export default Post;
