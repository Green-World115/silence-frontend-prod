import * as React from "react";
import MuiList from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";

import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { TextField, useTheme } from "@mui/material";
import { Container, ListContainer, SearchContainer } from "./styled";
import { useChat } from "../context";
import { useNavigate } from "react-router-dom";
const users = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];

const List = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  const { chatList } = useChat();

  const handleSelect = (id) => navigate(`/chat/${id}`);

  const drawer = (
    <Container>
      <SearchContainer>
        <TextField size="small" fullWidth placeholder="Search user" />
      </SearchContainer>
      <Divider component="div" />
      <ListContainer>
        <MuiList disablePadding>
          {chatList?.map((chat, key) => (
            <div key={key}>
              <ListItem alignItems="flex-start" disablePadding>
                <ListItemButton onClick={() => handleSelect(chat.id)}>
                  <ListItemAvatar>
                    <Avatar alt={chat.name} src="/static/images/avatar/1.jpg" />
                  </ListItemAvatar>
                  <ListItemText
                    primary={chat.name}
                    secondary={
                      <React.Fragment>
                        <Typography component="span" variant="body2" color="text.primary">
                          How are you?
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItemButton>
              </ListItem>
              <Divider component="li" />
            </div>
          ))}
        </MuiList>
      </ListContainer>
    </Container>
  );

  return <>{mobile ? <Drawer open={false}>{drawer}</Drawer> : <>{drawer}</>}</>;
};

export default List;
