import { formatDistanceToNow } from "date-fns";

export function formatToNow(date) {
  return date
    ? formatDistanceToNow(new Date(date), {
        addSuffix: true,
      })
    : "";
}
