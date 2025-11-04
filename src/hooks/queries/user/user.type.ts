// User Management API Response Types

export interface User {
  name: string;
  ratingScore: number;
  status: string;
  swapCompleted: number;
  dateJoined: string;
  userRole: string;
  lastActive: string;
  profilePicture: string | null;
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

