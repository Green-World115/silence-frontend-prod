import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../../../contexts/AuthContext";
import useToggle from "../../../../../hooks/useToggle";
import NewPost from "../NewPost";
import Posts from "../Posts";
import styles from "./group.module.scss";

const Group = () => {
  const { currentUser } = useAuth();
  const [showNewPost, toggleNewPost] = useToggle();
  let { id } = useParams();
  const handleSuccess = () => {
    toggleNewPost();
  };
  return (
    <div className={styles.container}>
      <NewPost
        open={showNewPost}
        onClose={toggleNewPost}
        userId={currentUser.uid}
        userName={"test"}
        groupId={id}
        onSuccess={handleSuccess}
      />
      <div className={styles.header}>
        <h4>Main chat</h4>
        <Button size="sm" onClick={toggleNewPost}>
          New Post
        </Button>
      </div>
      <div className={styles.content}>
        <Posts />
      </div>
    </div>
  );
};

export default Group;
