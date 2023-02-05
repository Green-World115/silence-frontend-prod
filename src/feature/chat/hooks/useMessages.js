import { useEffect, useState } from "react";
import * as chatApi from "api/chat";

export const useMessages = (conversationId) => {
  const [messages, setMessages] = useState([]);
  const [pagination, setPagination] = useState({ totalPages: 1, currentPage: 1 });
  const [name, setName] = useState("");

  const getMessages = async (page = 1) => {
    const { data, count, error } = await chatApi.getMessages(conversationId, page);
    if (error) console.log(error);
    else {
      setPagination({ totalPages: Math.ceil(count / 10), currentPage: page });
      setMessages([...messages, ...data]);
    }
  };

  const loadNext = () => {
    getMessages(pagination.currentPage + 1);
  };

  const handleUpdateMessages = (data) => {
    setMessages((state) => [data.new, ...state]);
  };

  useEffect(() => {
    if (conversationId) getMessages();
    chatApi.subscribeToMessages(conversationId, handleUpdateMessages);

    // return () => chatApi.unsubscribeToMessages();
  }, [conversationId]);

  return { messages, pagination, loadNext };
};
