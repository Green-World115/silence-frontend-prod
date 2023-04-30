import { Skeleton } from "@mui/material";
import React from "react";

const Skelton = () => {
  return (
    <div>
      <Skeleton height={40} />
      <Skeleton height={20} width={120} />
      <Skeleton height={20} width={80} />
    </div>
  );
};

export default Skelton;
