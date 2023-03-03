import React from "react";
import { Box, Card, Checkbox, FormControlLabel, FormGroup, FormLabel, Stack, Typography } from "@mui/material";
import { useData } from "./useData";
import { Controller, useForm } from "react-hook-form";
import Button from "components/Button";
import map from "lodash/map";
import causes from "constants/causes";
import { CustomAvatar } from "components/custom-avatar";
import xor from "lodash/xor";

import { UserContainer } from "./styled";

const Users = ({ onChange, value }) => {
  const { symptoms, users, loadingSymptoms, loadingUser, getUsers } = useData();

  const { control, handleSubmit } = useForm({ defaultValues: { symptoms: [], causes: [] } });

  const submit = handleSubmit((data) => getUsers(data.symptoms, data.causes));

  //add reset functionalities

  return (
    <Card sx={{ p: 3 }}>
      <Typography variant="h6">Find people to invite</Typography>
      <Typography mb={3} variant="body2" color="text.secondary">
        Use this section to profile the people you want to mass invite
      </Typography>
      <Stack spacing={2}>
        <div>
          <FormLabel>Symptoms</FormLabel>
          <FormGroup row>
            {symptoms.map((symptom) => (
              <FormControlLabel
                key={symptom.id}
                label={symptom.name}
                control={
                  <Controller
                    control={control}
                    name="symptoms"
                    render={({ field: { onChange, value } }) => (
                      <Checkbox
                        checked={value?.includes[symptom.id]}
                        onChange={(e) => {
                          e.target.checked ? onChange([symptom.id, ...value]) : onChange(xor(value, [symptom.id]));
                        }}
                      />
                    )}
                  />
                }
              />
            ))}
          </FormGroup>
        </div>
        <div>
          <FormLabel>Causes</FormLabel>
          <FormGroup row>
            {map(causes, (cause) => (
              <FormControlLabel
                key={cause.id}
                label={cause}
                control={
                  <Controller
                    control={control}
                    name="causes"
                    render={({ field: { onChange, value } }) => (
                      <Checkbox
                        checked={value?.includes[cause]}
                        onChange={(e) => {
                          e.target.checked ? onChange([cause, ...value]) : onChange(xor(value, [cause]));
                        }}
                      />
                    )}
                  />
                }
              />
            ))}
          </FormGroup>
        </div>
        <Box display="flex" justifyContent="flex-end">
          <Button onClick={submit} loading={loadingUser}>
            Generate Users
          </Button>
        </Box>

        {users.length > 0 && (
          <UserContainer>
            {users?.map((user) => (
              <Stack key={user.id} direction="row" alignItems="center" spacing={1} sx={{ p: 1 }}>
                <Checkbox
                  onChange={(e) => {
                    e.target.checked ? onChange([user.id, ...value]) : onChange(xor(value, [user.id]));
                  }}
                  checked={value?.includes[user.id]}
                />
                <CustomAvatar name={user.firstName + user.lastName} src={user.image} />
                <Typography variant="subtitle2">{`${user.firstName} ${user.lastName || ""}`}</Typography>
              </Stack>
            ))}
          </UserContainer>
        )}
      </Stack>
    </Card>
  );
};

export default Users;
