import React from "react";
import Sidebar from "../Sidebar";
import styles from "./layout.module.scss";

const Layout = ({ children }) => {
  return (
    <div>
      <Sidebar />
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default Layout;
