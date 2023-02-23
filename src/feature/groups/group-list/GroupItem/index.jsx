import { Stack, Typography } from "@mui/material";
import Button from "components/Button";
import { CustomAvatar } from "components/custom-avatar";
import { useRouter } from "next/router";
import React from "react";
import { Container } from "./styled";

const GroupItem = ({ name, id, isAccepted, onJoin, onDecline }) => {
  const router = useRouter();

  const handleSelect = () => isAccepted && router.push(`groups/${id}`);

  return (
    <Container role="button" onClick={handleSelect}>
      <Stack direction="row" alignItems="center" spacing={2}>
        <CustomAvatar src="" name={name} />
        <Typography>{name}</Typography>
      </Stack>
      <Stack></Stack>
      {!isAccepted && (
        <Stack direction="row" spacing={2}>
          <Button size="small" color="success" onClick={() => onJoin(id)}>
            Join
          </Button>
          <Button size="small" color="error" onClick={() => onDecline(id)}>
            Decline
          </Button>
        </Stack>
      )}
    </Container>
  );
};

export default GroupItem;
