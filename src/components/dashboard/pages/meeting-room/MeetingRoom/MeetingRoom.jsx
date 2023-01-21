import React, { useEffect, useState, useRef } from "react";

import Sidebar from "../../../components/Sidebar";
import Content from "../../../components/chat/Content";
import Layout from "../../../components/Layout/Layout";

export default function MeetingRoom() {
  return (
    <Layout>
      <Content />
    </Layout>
  );
}
