import Nav from "react-bootstrap/Nav";
import style from "./chatRoom.module.scss";
function ChatRoomList() {
  return (
    <div className={style.container}>
      <Nav variant="pills" className="flex-column">
        <Nav.Item>
          <Nav.Link eventKey="first">Main chat</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="g1">Group 1</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="g2">Group 2</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="g3">Group 3</Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
}

export default ChatRoomList;
