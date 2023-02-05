import { createContext, useContext, useEffect, useState } from "react";
import * as chatApi from "../../api/chat";
import { mapChatList } from "./map";
const ChatContext = createContext(null);

const ChatProvider = ({ children }) => {
  const chat = useChatProvider();
  return <ChatContext.Provider value={chat}>{children}</ChatContext.Provider>;
};

export const useChat = () => {
  const chatContext = useContext(ChatContext);
  if (!chatContext) {
    throw new Error("chatContext has to be used within <ChatContext.Provider>");
  }
  return chatContext;
};

export const useChatProvider = () => {
  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    const getChatList = async () => {
      const { data, error } = await chatApi.getUserConversations("1");
      console.log(data);
      setChatList(mapChatList(data));
    };
    getChatList();
  }, []);

  return { chatList };
};

export default ChatProvider;
