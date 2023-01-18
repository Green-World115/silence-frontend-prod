import { Button } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import ChatRoomList from "../ChatRoomList";
import NewPost from "../NewPost";
import Post from "../Post";
import styles from "./chatRoom.module.scss";

const ChatRoom = () => {
  return (
    <div className={styles.container}>
      <NewPost open={false} />
      <div className={styles.header}>
        <h4>Main chat</h4>
        <Button size="sm">New Post</Button>
      </div>
      <div className={styles.postsContainer}>
        <Post
          user="Alex"
          time="2 hours ago"
          text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centurie"
        />

        <Post
          user="Alex"
          time="2 hours ago"
          text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centurie"
        />

        <Post
          user="Alex"
          time="2 hours ago"
          text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centurie"
        />

        <Post
          user="Alex"
          time="2 hours ago"
          text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centurie"
        />

        <Post
          user="Alex"
          time="2 hours ago"
          text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centurie"
        />
      </div>
    </div>
  );
};

export default ChatRoom;
