import React, { ReactNode } from "react";

type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type CellValue =
  | string
  | number
  | boolean
  | Date
  | null
  | undefined
  | object
  | ReactNode;

export interface DataItem {
  [key: string]: CellValue;
  id?: string | number;
}

export interface ITableProps<T extends DataItem> {
  tableData: T[];
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  statusKey?: keyof T;
  onRowClick?: (item: T) => void;
  setFilter?: React.Dispatch<React.SetStateAction<string>>;
  isLoading?: boolean;
  showPagination?: boolean;
}

export interface UsersData extends DataItem {
  profilePicture: string;
  profile: string;
  email?: string;
  isSuspended?: boolean;
  trustScore?: string | number;
  id: string | number;
  swaps: number;
  productid?: string;
  status: string;
  // product?: Record<string | number, string | number> | any;
  dateJoined: string;
  role: string;
}
export interface SwapActivityData extends DataItem {
  swapProceedId: string;
  ownerName: string;
  swapperName: string;
  ownerItem: string;
  swapperItem: string;
  status: string;
  initiatedOn: string;
  lastActivity: string;
  isFlagged?: boolean;
  action?: string;
}

export interface FlagData extends DataItem {
  reportId?: string;
  reporter: string;
  reporterImg?: string | null;
  type: string;
  reportedEntity: string;
  reportedPersonImg?: string | null;
  status: string;
  createdAt: string;
  reason?: string;
}

export interface IPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface SwapDetailsProps {
  listingId: string;
  name: string;
  condition: string;
  price: number | string;
  estimatedCurrency?: string;
  itemUrl: string;
  isVideo?: boolean;
  mediaType?: "Image" | "Video" | "Document";
  category: string;
  listType?: string;
  status: string;
  reviewStage?: string;
  isFlagged?: boolean;
  description: string;
  location: string;
  dateListed: string;
  datePosted: string;
  edited: string;
  requestedInExchange: any;
  owner: string;
  ownerAvatar: string;
  ownerId?: string;
  rating: number | string;
  swap: {
    total: number | string;
  };
}

export interface ActivityData extends DataItem {
  user: string;
  action: string;
  date: string;
  role: string;
}

export interface RoleData extends DataItem {
  roleName: string;
  description: string;
  userCount: number;
}

export interface AuditData extends DataItem {
  action: string;
  user: string;
  performedBy: string;
  timeStamp: string;
}
