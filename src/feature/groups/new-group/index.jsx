import React, { useState } from "react";
import { Box, Typography, Stack, Grid, Paper, Card } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import RHFTextField from "components/hook-forms/RHFTextField";
import Users from "./Users";
import Button from "components/Button";
import * as postApi from "@api/post";
import { useUser } from "feature/auth/context";
import { useRouter } from "next/router";

const NewGroup = () => {
  const user = useUser();
  const [submitting, setSubmitting] = useState(false);

  const router = useRouter();

  const { control, handleSubmit } = useForm({ defaultValues: { users: [], name: "", description: "" } });

  const submit = handleSubmit(async (data) => {
    setSubmitting(true);
    const createGroupResponse = await postApi.createGroup({
      name: data.name,
      description: data.description,
      createdBy: user.id,
    });
    if (createGroupResponse.data) {
      const addUserResponse = await postApi.addUsersToGroup(createGroupResponse.data.id, user.id, [
        ...data.users,
        user.id,
      ]);
      router.push("/groups");
    }

    setSubmitting(false);
  });

  return (
    <Box width="100%">
      <Stack direction="row" justifyContent="space-between" sx={{ mb: 5 }}>
        <Typography variant="h5" fontWeight="bold">
          Create Group
        </Typography>
      </Stack>

      <Grid container spacing={5}>
        <Grid item xs={12} md={5}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <RHFTextField control={control} name="name" label="Name" />
              <RHFTextField control={control} name="description" label="Description" multiline minRows={3} />
            </Stack>
          </Card>
        </Grid>
        <Grid item xs={12} md={7}>
          <Controller
            name="users"
            control={control}
            render={({ field: { value, onChange } }) => <Users onChange={onChange} value={value} />}
          />
        </Grid>
      </Grid>
      <Stack justifyContent="flex-end" mt={5} direction="row" spacing={2}>
        <Button size="large" variant="outline">
          Cancel
        </Button>
        <Button size="large" onClick={submit} loading={submitting}>
          Create Group
        </Button>
      </Stack>
    </Box>
  );
};

export default NewGroup;
