import { Container } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import ChatRoom from "../ChatRoom/ChatRoom";
import ChatRoomList from "../ChatRoomList";
import styles from "./content.module.scss";
function LeftTabsExample() {
  return (
    <div className={styles.container}>
      <ChatRoomList />
      <ChatRoom />
    </div>
  );
}

export default LeftTabsExample;
