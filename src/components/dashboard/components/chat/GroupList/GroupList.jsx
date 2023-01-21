import Nav from "react-bootstrap/Nav";
import { useNavigate, useParams } from "react-router-dom";
import { useGroupList } from "../../../hooks/useChat";
import flatMap from "lodash/flatMap";
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
        {flatMap(data, (item) => item.groups).map((group) => (
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
