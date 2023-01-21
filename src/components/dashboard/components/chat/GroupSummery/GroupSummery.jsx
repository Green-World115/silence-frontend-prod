import Nav from "react-bootstrap/Nav";
import { useNavigate, useParams } from "react-router-dom";
import { useGroupList } from "../../../hooks/useChat";
import styles from "./groupSummery.module.scss";

function GroupSummery() {
  const navigate = useNavigate();
  let { id } = useParams();

  const { data, loading } = useGroupList();

  const handleSelect = (e) => {
    navigate(`/meeting-room/${e}`);
  };

  return <div className={styles.container}>
    
  </div>;
}

export default GroupSummery;
