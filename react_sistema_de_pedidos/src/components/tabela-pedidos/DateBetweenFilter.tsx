/* eslint-disable @typescript-eslint/no-explicit-any */
import { FilterFn } from "@tanstack/react-table";
import moment from "moment";

export const dateBetweenFilterFn: FilterFn<any> = (row, columnId, value) => {
  const date = row.getValue(columnId) as string;

  const [start, end] = value;
  if (!start && !end) {
    return true;
  }

  if (start && !end) {
    return moment(date).isSameOrAfter(moment(start), "day");
  } else if (!start && end) {
    return moment(date).isSameOrBefore(moment(end), "day");
  } else if (start && end) {
    const startDate = moment(start).startOf("day").format("YYYY-MM-DD HH:mm");
    const endDate = moment(end).endOf("day").format("YYYY-MM-DD HH:mm");
    return moment(date).isBetween(startDate, endDate, "minute", "[]");
  }
  return true;
};

dateBetweenFilterFn.autoRemove;

export default dateBetweenFilterFn;
