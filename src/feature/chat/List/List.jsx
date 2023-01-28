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
const users = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];

const List = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("md"));

  const drawer = (
    <Container>
      <SearchContainer>
        <TextField size="small" fullWidth placeholder="Search user" />
      </SearchContainer>
      <Divider component="div" />
      <ListContainer>
        <MuiList disablePadding>
          {users.map((user, key) => (
            <div key={key}>
              <ListItem alignItems="flex-start" disablePadding>
                <ListItemButton>
                  <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                  </ListItemAvatar>
                  <ListItemText
                    primary="David"
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
