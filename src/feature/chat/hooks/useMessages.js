import { useEffect, useState } from "react";
import * as chatApi from "api/chat";

export const useMessages = (chatGroupId) => {
  const [messages, setMessages] = useState([]);
  const [pagination, setPagination] = useState({ totalPages: 1, currentPage: 1 });
  const [name, setName] = useState("");

  const getMessages = async (page = 1) => {
    const { data, count, error } = await chatApi.getMessages(chatGroupId, page);
    if (error) console.log(error);
    else {
      setPagination({ totalPages: Math.ceil(count / 10), currentPage: page });
      if (page === 1) setMessages(data);
      else setMessages([...messages, ...data]);
    }
  };

  const getGroupDetails = async (page = 1) => {
    const { data, count, error } = await chatApi.getChatGroupById(chatGroupId);
    if (error) console.log(error);
    else {
      setPagination({ totalPages: Math.ceil(count / 10), currentPage: page });
      if (page === 1) setMessages(data);
      else setMessages([...messages, ...data]);
    }
  };

  const loadNext = () => {
    getMessages(pagination.currentPage + 1);
  };

  const handleUpdateMessages = (data) => {
    setMessages((state) => [data.new, ...state]);
  };

  useEffect(() => {
    if (chatGroupId) {
      getMessages();
    }
    chatApi.subscribeToMessages(chatGroupId, handleUpdateMessages);

    // return () => chatApi.unsubscribeToMessages();
  }, [chatGroupId]);

  return { messages, pagination, loadNext };
};
