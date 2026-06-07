import { format } from "date-fns";

interface StatusStyles {
  borderColor: string;
  bg: string;
  textColor: string;
}

export const isReviewPending = (reviewStage?: string | null): boolean =>
  reviewStage?.trim().toLowerCase() === "pending";

export const isReviewApproved = (reviewStage?: string | null): boolean =>
  reviewStage?.trim().toLowerCase() === "approved";

export const isUserSuspended = (options: {
  isSuspended?: boolean | null;
  isSuspendUser?: boolean | null;
  status?: string | null;
}): boolean => {
  const { isSuspended, isSuspendUser, status } = options;

  return (
    isSuspended === true ||
    isSuspendUser === true ||
    status?.trim().toLowerCase() === "suspended"
  );
};

const normalizeStatusKey = (status?: string | null): string =>
  status?.trim().toLowerCase().replace(/\s+/g, "") ?? "";

export const getSwapStatusStyles = (status?: string | null): StatusStyles => {
  switch (normalizeStatusKey(status)) {
    case "pending":
      return {
        borderColor: "#FFE1A5",
        bg: "#FFF9EC",
        textColor: "#BB7E05",
      };
    case "negotiation":
      return {
        borderColor: "#FFD4A8",
        bg: "#FFF4E8",
        textColor: "#C45E00",
      };
    case "advnegotiation":
      return {
        borderColor: "#D4B8FF",
        bg: "#F6F0FF",
        textColor: "#7B3FE4",
      };
    case "awaitingvendorholdingfee":
      return {
        borderColor: "#007AFF1A",
        bg: "#007AFF1A",
        textColor: "#007AFF",
      };
    case "swapped":
      return {
        borderColor: "#C5FFBC",
        bg: "#EDFFEA",
        textColor: "#106104",
      };
    case "closed":
      return {
        borderColor: "#D1D1D1",
        bg: "#F3F3F3",
        textColor: "#5C5C5C",
      };
    default:
      return getStatusStyles(normalizeStatusKey(status) || "pending");
  }
};

export const getStatusStyles = (status: string): StatusStyles => {
  switch (status) {
    case "pending":
    case "under review":
    case "negotiating":
    case "negotiation":
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
    case "listed":
    case "approved":
    case "resolved":
    case "completed":
      return {
        borderColor: "#C5FFBC",
        bg: "#EDFFEA",
        textColor: "#106104",
      };
    case "rejected":
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
 * Formats a numeric amount with thousands separators and 2 decimal places.
 * @example formatAmount(245000) => "245,000.00"
 */
export function formatAmount(
  amount: number | string | null | undefined
): string {
  const num = Number(amount);
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number.isFinite(num) ? num : 0);
}

/**
 * Formats amount with an optional currency code prefix.
 * @example formatCurrency(245000, "NGN") => "NGN 245,000.00"
 */
export function formatCurrency(
  amount: number | string | null | undefined,
  currency?: string | null
): string {
  const formatted = formatAmount(amount);
  const code = currency?.trim();
  return code ? `${code} ${formatted}` : formatted;
}

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
  originalSrc: string | null | undefined,
  hasError: boolean,
  fallbackUrl: string = "https://plus.unsplash.com/premium_photo-1664537979073-a467fa628555?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2371"
): string => {
  const src = originalSrc?.trim();
  if (hasError || !src) return fallbackUrl;
  return src;
};