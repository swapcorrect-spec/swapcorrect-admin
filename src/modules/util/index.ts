import { format } from "date-fns";

interface StatusStyles {
  borderColor: string;
  bg: string;
  textColor: string;
}

export const getStatusStyles = (status: string): StatusStyles => {
  switch (status) {
    case "pending":
    case "under review":
    case "negotiating":
      return {
        borderColor: "#FFE1A5",
        bg: "#FFF9EC",
        textColor: "#BB7E05",
      };
    case "new":
    case "suspended":
      return {
        borderColor: "#007AFF1A",
        bg: "#007AFF1A",
        textColor: "#007AFF",
      };
    case "active":
    case "resolved":
    case "completed":
      return {
        borderColor: "#C5FFBC",
        bg: "#EDFFEA",
        textColor: "#106104",
      };
    case "flagged":
    case "dismissed":
    case "cancelled":
      return {
        borderColor: "#FFC4C4",
        bg: "#FFE5E58F",
        textColor: "#E42222",
      };
    default:
      return {
        borderColor: "#FFE1A5",
        bg: "#FFF9EC",
        textColor: "#BB7E05",
      };
  }
};

/**
 * Formats a date string to "MMM dd, yyyy, hh:mm a" (e.g. May 17, 2025, 09:45 AM)
 * @param dateString ISO date string or Date object
 * @returns formatted date string
 */
export function formatDateTime(dateString: string): string {
  return format(new Date(dateString), "MMM dd, yyyy, hh:mm a");
}
