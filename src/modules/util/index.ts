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
 * @returns formatted date string or "N/A" if invalid
 */
export function formatDateTime(dateString: string | undefined | null): string {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "N/A";
  return format(date, "MMM dd, yyyy, hh:mm a");
}

export const createImageErrorHandler = (
  setErrorState: (error: boolean) => void,
  fallbackUrl: string = "https://plus.unsplash.com/premium_photo-1664537979073-a467fa628555?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2371"
) => {
  return () => {
    setErrorState(true);
  };
};

export const getImageSrcWithFallback = (
  originalSrc: string,
  hasError: boolean,
  fallbackUrl: string = "https://plus.unsplash.com/premium_photo-1664537979073-a467fa628555?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2371"
): string => {
  return hasError ? fallbackUrl : originalSrc;
};