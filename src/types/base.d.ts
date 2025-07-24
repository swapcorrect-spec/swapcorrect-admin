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
  profile: string;
  trustScore?: string;
  id?: string | number;
  swaps: number;
  productid?: string;
  status: string;
  // product?: Record<string | number, string | number> | any;
  dateJoined: string;
  role: string;
}
export interface SwapActivityData extends DataItem {
  itemOne: string;
  itemTwo: string;
  swapperOne: string;
  swapperTwo: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface FlagData extends DataItem {
  reporter: string;
  type: string;
  reportedEntity: string;
  status: string;
  createdAt: string;
  reason?: string;
}

export interface IPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
