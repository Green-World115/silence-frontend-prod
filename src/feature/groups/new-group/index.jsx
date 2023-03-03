import React, { useState } from "react";
import { Box, Typography, Stack, Grid, Paper, Card, FormLabel } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import RHFTextField from "components/hook-forms/RHFTextField";
import Users from "./Users";
import Button from "components/Button";
import * as postApi from "@api/post";
import { useUser } from "feature/auth/context";
import { useRouter } from "next/router";
import RHFSwitch from "components/hook-forms/RHFSwitch";
import groupRoles from "constants/groupRoles";
import { useSnackbar } from "notistack";

const NewGroup = () => {
  const user = useUser();
  const [submitting, setSubmitting] = useState(false);

  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const { control, handleSubmit } = useForm({
    defaultValues: { users: [], name: "", description: "", allowInvitation: false },
  });

  const handleCancel = () => router.push("/groups");

  const submit = handleSubmit(async (data) => {
    setSubmitting(true);
    const createGroupResponse = await postApi.createGroup({
      name: data.name,
      description: data.description,
      createdBy: user.id,
      allowInvitation: data.allowInvitation,
    });

    if (createGroupResponse.error) {
      enqueueSnackbar("Create the group failed", { variant: "error" });
    } else if (createGroupResponse.data) {
      const users = [...data.users, user.id].map((userId) => ({
        userId: userId,
        postGroupId: createGroupResponse.data.id,
        isAccepted: userId === user.id,
        role: userId === user.id ? groupRoles.OWNER : groupRoles.MEMBER,
      }));
      const addUserResponse = await postApi.addUsersToGroup(users);
      if (addUserResponse.error) enqueueSnackbar("Add users to the group failed", { variant: "error" });
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
              <div>
                <RHFSwitch
                  name="allowInvitation"
                  control={control}
                  label="Can members send invite to other people?"
                  labelPlacement="start"
                  sx={{ mx: 0, width: "100%", justifyContent: "space-between" }}
                />
              </div>
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
        <Button size="large" variant="outline" onClick={handleCancel}>
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
