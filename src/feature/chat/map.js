export const mapChatList = (data = []) => {
  return data.map((item) => ({
    name: !item.conversation.private ? item.conversation.name : "temp name",
    id: item.conversation.id,
  }));
};
