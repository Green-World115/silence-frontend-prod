import React, { useState } from "react";
import MuiList from "@mui/material/List";
import Drawer from "@mui/material/Drawer";
import useMediaQuery from "@mui/material/useMediaQuery";

import Divider from "@mui/material/Divider";
import { TextField, Typography, useTheme } from "@mui/material";
import { useChat } from "../context";
import { useSearch } from "../hooks/useSearch";
import Item from "./Item";
import { Container, ListContainer, SearchContainer, SectionTitle } from "./styled";
const users = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];

const List = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("md"));

  const [searchText, setSearchText] = useState(null);
  const { chatGroups } = useChat();

  const search = useSearch(searchText);

  const handleChangeSearch = (e) => setSearchText(e.target.value);

  const drawer = (
    <Container>
      <SearchContainer>
        <TextField size="small" fullWidth placeholder="Enter user name or email" onChange={handleChangeSearch} />
      </SearchContainer>
      <Divider component="div" />
      <ListContainer>
        <MuiList disablePadding>
          {!searchText && (
            <>
              {chatGroups?.data?.map((chat) => (
                <Item name={chat.name} userId={chat.userId} />
              ))}
            </>
          )}

          {searchText && (
            <>
              {search.data?.groups?.length > 0 && (
                <SectionTitle>
                  <Typography variant="subtitle1">Chat</Typography>
                </SectionTitle>
              )}
              {search?.data?.groups?.map((chat) => (
                <Item name={chat.name} userId={chat.userId} />
              ))}
              <SectionTitle>
                <Typography variant="subtitle1">Users</Typography>
              </SectionTitle>
              {search?.data?.users?.map((user) => (
                <Item name={user.firstName} userId={user.id} />
              ))}
            </>
          )}
        </MuiList>
      </ListContainer>
    </Container>
  );

  return <>{mobile ? <Drawer open={false}>{drawer}</Drawer> : <>{drawer}</>}</>;
};

export default List;
