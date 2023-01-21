import { Button } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import { useNavigate } from "react-router-dom";
import { useGroupList } from "../../../hooks/useChat";
import NavBar from "../../NavBar";
import styles from "./groupSummery.module.scss";
import { BsPlus } from "react-icons/bs";
import FloatingButton from "../../../../common/FloatingButton";
import NewGroup from "../NewGroup";
import useToggle from "../../../../../hooks/useToggle";
function GroupSummery() {
  const [showNewGroup, toggleNewGroup] = useToggle();
  const navigate = useNavigate();
  const { data } = useGroupList();

  const handleSelect = (e) => {
    navigate(`/meeting-room/${e}`);
  };

  return (
    <div>
      <NavBar title="Chat groups" />
      <NewGroup open={showNewGroup} onClose={toggleNewGroup} />
      <FloatingButton onClick={toggleNewGroup}>
        <BsPlus fontSize={30} />
      </FloatingButton>
      <div className={styles.container}>
        {data.map((item) => (
          <ListGroup as="ul" className="mb-4">
            <ListGroup.Item as="li" active>
              {item.category}
            </ListGroup.Item>
            <>
              {item.groups.map((group) => (
                <ListGroup.Item as="li">
                  <div className={styles.groupItem}>
                    <h6>{group.name}</h6>
                    <p>{group.userIds.length} active users</p>
                    <Button variant="light" size="sm" onClick={() => handleSelect(group.id)}>
                      View
                    </Button>
                  </div>
                </ListGroup.Item>
              ))}
            </>
          </ListGroup>
        ))}
      </div>
    </div>
  );
}

export default GroupSummery;
