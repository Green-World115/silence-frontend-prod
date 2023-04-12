import { format, formatDistanceToNow } from "date-fns";

export function formatToNow(date) {
  return date
    ? formatDistanceToNow(new Date(date), {
        addSuffix: false,
      })
    : "";
}

export const formateDateTime = (date) => {
  return format(date, "MM/dd/yyyy kk:mm");
};
