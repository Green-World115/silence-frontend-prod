import { useCallback, useState } from 'react';
import MuiList from '@mui/material/List';
import useMediaQuery from '@mui/material/useMediaQuery';

import Divider from '@mui/material/Divider';
import { TextField, Typography, useTheme } from '@mui/material';
import { useSearch } from '../hooks/use-search';
import Item from './Item';
import {
  Container,
  ListContainer,
  NotFoundContainer,
  SearchContainer,
  SectionTitle,
} from './styled';
import Skeleton from './Skeleton';
import isEmpty from 'lodash/isEmpty';

const List = () => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('md'));

  const [searchText, setSearchText] = useState('');

  const { data, isLoading } = useSearch(searchText);

  const handleChangeSearch = useCallback((e) => {
    const value = e.target.value
    if (value) {
      setSearchText(value)
    } else {
      setSearchText("*")
    }
  }, []);

  const handleFocus = useCallback(() => {
    if (searchText === "") {
      setSearchText("*")
    }
  }, [searchText])

  const handleBlur = useCallback(() => {
    if (searchText === '*') setSearchText("")
  }, [searchText])

  const drawer = (
    <Container style={{ overflow: 'auto'}}>
      <SearchContainer>
        <TextField
          size="small"
          fullWidth
          placeholder="Enter user name or email"
          onChange={handleChangeSearch}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </SearchContainer>
      <Divider component="div" />
      <ListContainer>
        {isLoading ? (
          <Skeleton />
        ) : (
          <MuiList disablePadding>
            {!isEmpty(data?.groups) && searchText && (
              <SectionTitle>
                <Typography variant="subtitle1">Chat</Typography>
              </SectionTitle>
            )}
            {data?.groups?.map((group, idx) => (
              <Item
                name={group.name}
                unreadCount={group.unreadCount}
                receiverId={group.receiverId}
                avatar={group.avatar}
                key={idx}
              />
            ))}
            {!isEmpty(data?.users) && searchText && (
              <SectionTitle>
                <Typography variant="subtitle1">Users</Typography>
              </SectionTitle>
            )}
            {searchText && data?.users?.map((user) => (
              <Item name={user.firstName} receiverId={user.id} key={user.id} />
            ))}
          </MuiList>
        )}

        {!isLoading && isEmpty(data?.groups) && isEmpty(data?.users) && searchText && (
          <NotFoundContainer>
            <Typography>No user or chat found</Typography>
          </NotFoundContainer>
        )}
      </ListContainer>
    </Container>
  );

  return <>{drawer}</>;
};

export default List;
