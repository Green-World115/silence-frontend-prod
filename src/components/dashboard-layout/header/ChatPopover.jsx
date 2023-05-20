import React from 'react';
import { Badge, IconButton } from '@mui/material';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import { useRouter } from 'next/router';
import { useChatMessages } from './hooks/use-chat-messages';

const ChatPopover = () => {
  const router = useRouter();
  const handleChat = () => router.push('/chat');
  useChatMessages();

  return (
    <div>
      <IconButton onClick={handleChat}>
        <Badge color="primary" badgeContent={2}>
          <ChatBubbleOutlineOutlinedIcon color="primary" />
        </Badge>
      </IconButton>
    </div>
  );
};

export default ChatPopover;
