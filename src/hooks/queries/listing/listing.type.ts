// Listing Management API Response Types

export type SwapListingStatus = "Published" | "Negotiation" | "Swapped" | "All";

export const SWAP_LISTING_STATUS_OPTIONS: {
  value: SwapListingStatus;
  label: string;
}[] = [
  { value: "All", label: "All swap statuses" },
  { value: "Published", label: "Listed" },
  { value: "Negotiation", label: "Negotiation" },
  { value: "Swapped", label: "Completed" },
];

const SWAP_STATUS_VALUES = new Set(["Published", "Negotiation", "Swapped"]);

const normalizeStageKey = (value?: string): string | undefined => {
  if (!value) return undefined;
  const key =
    value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  return key;
};

export const getSwapListingStatusLabel = (status?: string): string => {
  const normalized = normalizeStageKey(status);
  const labelMap: Record<string, string> = {
    Published: "Listed",
    Negotiation: "Negotiation",
    Swapped: "Completed",
  };
  return normalized ? (labelMap[normalized] ?? normalized) : "";
};

export const getReviewStageLabel = (stage?: string): string => {
  const normalized = normalizeStageKey(stage);
  const labelMap: Record<string, string> = {
    Pending: "Pending",
    Approved: "Approved",
    Rejected: "Rejected",
  };
  return normalized ? (labelMap[normalized] ?? normalized) : "Pending";
};

export const resolveListingSwapStatusLabel = (item: {
  swapListingStatus?: string;
  reviewStage?: string;
}): string => {
  if (item.swapListingStatus) {
    return getSwapListingStatusLabel(item.swapListingStatus);
  }

  const reviewStage = normalizeStageKey(item.reviewStage);
  if (reviewStage && SWAP_STATUS_VALUES.has(reviewStage)) {
    return getSwapListingStatusLabel(reviewStage);
  }

  if (reviewStage === "Approved") {
    return "Listed";
  }

  return getSwapListingStatusLabel(reviewStage) || "Listed";
};

/** @deprecated Use resolveListingSwapStatusLabel or getReviewStageLabel */
export const getListingStageLabel = (stage?: string): string => {
  const normalized = normalizeStageKey(stage);
  if (normalized && SWAP_STATUS_VALUES.has(normalized)) {
    return getSwapListingStatusLabel(normalized);
  }
  return getReviewStageLabel(normalized);
};
export type ListingDate = "All" | "LastWeek" | "LastMonth";
export type ReviewStage = "All" | "Pending" | "Approved" | "Rejected";

export interface ListingMedia {
  mediaType: "Image" | "Video" | "Document";
  url: string;
}

export interface ListingItem {
  listingId: string;
  userId: string;
  listType: string;
  itemName: string;
  estimatedCurrency: string;
  rating: number;
  swapCount: number;
  estimatedAmount: number;
  itemDescription: string;
  isFavItem: boolean;
  isFlagged?: boolean;
  swapListingStatus?: SwapListingStatus;
  reviewStage:
    | "Pending"
    | "Published"
    | "Negotiation"
    | "Swapped"
    | "Approved"
    | "Rejected";
  categoryName: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  profilePicture: string | null;
  username: string;
  media: ListingMedia[];
  swapListRequest: string[];
  itemCondition: string;
}

export interface ListingsResult {
  items: ListingItem[];
  totalCount: number;
  pageNumber: number;
  totalPages: number;
  pageSize: number;
}

export interface ListingsResponse {
  statusCode: number;
  displayMessage: string;
  result: ListingsResult;
  errorMessages: string[] | null;
}

export type ListingReviewAction = "Approved" | "Rejected";

export interface UpdateListingReviewPayload {
  listingId: string;
  review: ListingReviewAction;
  rejectionNote?: string;
}

export interface UpdateListingReviewResponse {
  statusCode: number;
  displayMessage: string;
  result: unknown;
  errorMessages: string[] | null;
}

export interface FlagContentPayload {
  contentId: string;
  contentType: "Listing";
  isFlagged: boolean;
}

export interface FlagContentResponse {
  statusCode: number;
  displayMessage: string;
  result: unknown;
  errorMessages: string[] | null;
}

export interface ListingDetailsResponse {
  statusCode: number;
  displayMessage: string;
  result: ListingItem;
  errorMessages: string[] | null;
}

