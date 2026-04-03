// Activity API Response Types

export interface ActivityItem {
  activityType: string;
  description: string;
  userName: string;
  timeAgo: string;
}

export interface RecentActivitiesResult {
  items: ActivityItem[];
  totalCount: number;
  pageNumber: number;
  totalPages: number;
  pageSize: number;
}

export interface RecentActivitiesResponse {
  statusCode: number;
  displayMessage: string;
  result: RecentActivitiesResult;
  errorMessages: string[] | null;
}

