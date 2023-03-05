import { useQuery } from "@tanstack/react-query";
import * as chatApi from "api/chat";
import useDebounce from "hooks/useDebounce";
export const useSearch = (searchText) => {
  const debounceSearchText = useDebounce(searchText, 300);

  const searchQuery = useQuery({
    queryKey: ["chat-search", debounceSearchText],
    queryFn: () => chatApi.searchChat(debounceSearchText),
    refetchOnWindowFocus: false,
  });

  return searchQuery;
};
