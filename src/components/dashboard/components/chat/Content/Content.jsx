import NavBar from "../../NavBar";
import Group from "../Group";
import GroupList from "../GroupList";
import styles from "./content.module.scss";

const Content = () => {
  return (
    <div className={styles.container}>
      <NavBar title="Chat groups" />
      <div className={styles.content}>
        <GroupList />
        <Group />
      </div>
    </div>
  );
};

export default Content;
