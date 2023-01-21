import Card from "react-bootstrap/Card";
import styles from "./postSkelton.module.scss";
import Skeleton from "react-loading-skeleton";

function PostSkelton() {
  return (
    <Card className={styles.container}>
      <Card.Body>
        <Skeleton width={200} height={15} />
        <Skeleton width={100} height={10} />
        <div className={styles.content}>
          <Skeleton width={300} height={12} />
          <Skeleton height={12} count={3} />
        </div>
        <Skeleton width={300} height={10} />
        <Skeleton height={10} count={2} />
      </Card.Body>
    </Card>
  );
}

export default PostSkelton;
