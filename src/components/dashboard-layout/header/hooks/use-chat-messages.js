import { useEffect } from 'react';
import * as chatApi from '@api/chat';
import { useUser } from 'feature/auth/context';

export const useChatMessages = () => {
  const user = useUser();

  useEffect(() => {
    chatApi.subscribeToUserChatMessages(user.id, () => {
      console.log('test');
    });
  }, []);
};
