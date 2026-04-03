// Listing Management API Response Types

export type SwapListingStatus = "Published" | "Negotiation" | "Swapped" | "All";
export type ListingDate = "All" | "LastWeek" | "LastMonth";

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
  reviewStage: "Pending" | "Published" | "Negotiation" | "Swapped";
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

export interface ListingDetailsResponse {
  statusCode: number;
  displayMessage: string;
  result: ListingItem;
  errorMessages: string[] | null;
}

