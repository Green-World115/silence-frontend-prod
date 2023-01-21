import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import useToggle from "../../../../../hooks/useToggle";
import { getPosts } from "../../../../../redux/slices/chat";
import FloatingButton from "../../../../common/FloatingButton";
import { BsPlus } from "react-icons/bs";
import NewPost from "../NewPost";
import Posts from "../Posts";
import styles from "./group.module.scss";

const Group = () => {
  const [showNewPost, toggleNewPost] = useToggle();

  let { id } = useParams();
  const dispatch = useDispatch();
  const handleSuccess = () => {
    toggleNewPost();
    dispatch(getPosts(id));
  };
  return (
    <div className={styles.container}>
      <NewPost open={showNewPost} onClose={toggleNewPost} groupId={id} onSuccess={handleSuccess} />
      <div className={styles.content}>
        <Posts />
      </div>
      <FloatingButton onClick={toggleNewPost}>
        <BsPlus fontSize={30} />
      </FloatingButton>
    </div>
  );
};

export default Group;
