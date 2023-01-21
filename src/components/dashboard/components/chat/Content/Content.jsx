import Group from "../Group";
import GroupList from "../GroupList";
import styles from "./content.module.scss";

const Content = () => {
  return (
    <div className={styles.container}>
      <GroupList />
      <Group />
    </div>
  );
};

export default Content;
