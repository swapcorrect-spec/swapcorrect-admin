// Dashboard API Response Types

interface StatItem {
  count: number;
  percentageChange: number;
  isIncrease: boolean;
}

export interface DashboardSummaryResult {
  swapper: StatItem;
  visitor: StatItem;
  activeUsers: StatItem;
  registeredUsers: StatItem;
  completedSwaps: StatItem;
  activeSwaps: StatItem;
}

export interface DashboardSummaryResponse {
  statusCode: number;
  displayMessage: string;
  result: DashboardSummaryResult;
  errorMessages: string[] | null;
}

// Analytics API Response Types
export interface Metric {
  name: string;
  percentage: number;
}

export interface MonthlySwaps {
  Jan: number;
  Feb: number;
  Mar: number;
  Apr: number;
  May: number;
  Jun: number;
  Jul: number;
  Aug: number;
  Sep: number;
  Oct: number;
  Nov: number;
  Dec: number;
}

export interface AnalyticsResult {
  metrics: Metric[];
  monthlySwaps: MonthlySwaps;
}

export interface AnalyticsResponse {
  statusCode: number;
  displayMessage: string;
  result: AnalyticsResult;
  errorMessages: string[] | null;
}

