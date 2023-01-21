import Nav from "react-bootstrap/Nav";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../../../contexts/AuthContext";
import { useGroupList } from "../../../hooks/useChat";
import styles from "./groupList.module.scss";
function ChatRoomList() {
  const navigate = useNavigate();
  let { id } = useParams();

  const { data, loading } = useGroupList();

  const handleSelect = (e) => {
    navigate(`/meeting-room/${e}`);
  };

  return (
    <div className={styles.container}>
      <Nav variant="pills" className="flex-column">
        {data.map((group) => (
          <Nav.Item>
            <Nav.Link onClick={() => handleSelect(group.id)} active={group.id === id}>
              {group.name}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
    </div>
  );
}

export default ChatRoomList;
