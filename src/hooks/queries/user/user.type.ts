// User Management API Response Types

export type UserFilterType =
  | "All"
  | "Active"
  | "Suspended"
  | "Flagged"
  | "NewSignups";

export const USER_FILTER_TYPE_OPTIONS: {
  value: UserFilterType;
  label: string;
}[] = [
  { value: "All", label: "All users" },
  { value: "Active", label: "Active" },
  { value: "Suspended", label: "Suspended" },
  { value: "Flagged", label: "Flagged" },
  { value: "NewSignups", label: "New signups" },
];

export interface User {
  userId: string;
  name: string;
  email?: string;
  isSuspended?: boolean;
  ratingScore: number;
  status: string;
  swapCompleted: number;
  dateJoined: string;
  userRole: string;
  lastActive: string;
  profilePicture: string | null;
}

export interface SuspendUserPayload {
  email: string;
}

export interface SuspendUserResponse {
  statusCode: number;
  displayMessage: string;
  result: unknown;
  errorMessages: string[] | null;
}

export interface UsersResult {
  items: User[];
  totalCount: number;
  pageNumber: number;
  totalPages: number;
  pageSize: number;
}

export interface UsersResponse {
  statusCode: number;
  displayMessage: string;
  result: UsersResult;
  errorMessages: string[] | null;
}

export interface UserStatsResult {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  totalSwappers: number;
  totalVisitors: number;
}

export interface UserStatsResponse {
  statusCode: number;
  displayMessage: string;
  result: UserStatsResult;
  errorMessages: string[] | null;
}

