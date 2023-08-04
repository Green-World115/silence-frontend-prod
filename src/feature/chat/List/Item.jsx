import { useRouter } from 'next/router';
import React from 'react';

import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Typography from '@mui/material/Typography';
import { Divider, Stack } from '@mui/material';

import { CustomAvatar } from 'components/custom-avatar';
import { UnreadLabel } from './styled';
import config from "@config/index";

const Item = ({ name, unreadCount, receiverId, avatar }) => {
  const router = useRouter();

  const handleRedirect = () => router.push(`/chat/private/${receiverId}`);

  return (
    <div>
      <ListItem alignItems="flex-start" disablePadding>
        <ListItemButton onClick={handleRedirect} disableRipple>
          <ListItemAvatar>
            <CustomAvatar
              size="sm"
              name={name}
              alt={name}
              src={avatar && `${config.avatarBaseUrl}${avatar}`}
              sx={{ width: 30, height: 30, mr: 2, fontSize: 16 }}
            />
          </ListItemAvatar>
          <ListItemText
            primary={
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography component="span" variant="subtitle2" color="text.primary">
                  {name}
                </Typography>
                {unreadCount > 0 && <UnreadLabel>{unreadCount}</UnreadLabel>}{' '}
              </Stack>
            }
            secondary={
              <React.Fragment>
                <Typography component="span" variant="caption" color="text.secondary"></Typography>
              </React.Fragment>
            }
          />
        </ListItemButton>
      </ListItem>
      <Divider component="li" />
    </div>
  );
};

export default Item;
