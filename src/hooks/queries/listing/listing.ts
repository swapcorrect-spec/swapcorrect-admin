import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SWAP_ACTIVITY } from "~/hooks/queries/swap-activity/swap-activity";
import {
  getRequestParams,
  getRequest,
  putRequest,
} from "~/config/request-methods";
import type {
  ListingsResponse,
  SwapListingStatus,
  ListingDate,
  ReviewStage,
  ListingDetailsResponse,
  UpdateListingReviewPayload,
  UpdateListingReviewResponse,
  FlagContentPayload,
  FlagContentResponse,
} from "./listing.type";
import type { MutationProps } from "~/types/mutation-prop-types";
import handleApiError from "~/utils/handle-api-error";

export const LISTINGS = "LISTINGS";

export const useGetListings = (props: {
  enabler: boolean;
  searchParam?: string;
  listingUserId?: string;
  swapListingStatus?: SwapListingStatus;
  reviewStage?: ReviewStage;
  listingDate?: ListingDate;
  pageNumber?: number;
  pageSize?: number;
}) => {
  const {
    enabler = true,
    searchParam,
    listingUserId,
    swapListingStatus = "All",
    reviewStage = "All",
    listingDate = "All",
    pageNumber = 1,
    pageSize = 20,
  } = props;

  const { data, isError, isSuccess, isLoading, isFetching, error, refetch } =
    useQuery({
      queryKey: [
        LISTINGS,
        searchParam,
        listingUserId,
        swapListingStatus,
        reviewStage,
        listingDate,
        pageNumber,
        pageSize,
      ],
      queryFn: async ({ signal }) =>
        getRequestParams<
          {
            searhParam?: string;
            listingUserId?: string;
            swapListingStatus?: SwapListingStatus;
            reviewStage?: ReviewStage;
            listingDate?: ListingDate;
            pageNumber: number;
            perpageSize: number;
          },
          ListingsResponse
        >({
          url: "/Admin/paginated/search_item",
          params: {
            searhParam: searchParam?.trim() || undefined,
            listingUserId: listingUserId || undefined,
            swapListingStatus:
              swapListingStatus === "All" ? undefined : swapListingStatus,
            reviewStage: reviewStage === "All" ? undefined : reviewStage,
            listingDate: listingDate === "All" ? undefined : listingDate,
            pageNumber,
            perpageSize: pageSize,
          },
          config: { signal },
        }),
      enabled: !!enabler,
      staleTime: 2 * 60 * 1000,
      gcTime: 5 * 60 * 1000,
    });

  return {
    data: data?.result,
    isLoading,
    isFetching,
    isError,
    error,
    isSuccess,
    refetch,
  };
};

export const LISTING_DETAILS = "LISTING_DETAILS";

export const useGetListingDetails = (props: {
  enabler: boolean;
  listingId: string;
}) => {
  const { enabler, listingId } = props;
  const { data, isError, isSuccess, isLoading, isFetching, error, refetch } =
    useQuery({
      queryKey: [LISTING_DETAILS, listingId],
      queryFn: () =>
        getRequest<ListingDetailsResponse>({
          url: `/listing_item/listing_details?listingId=${listingId}`,
        }),
      enabled: !!enabler && !!listingId,
    });

  return {
    data: data?.result,
    isLoading,
    isFetching,
    isError,
    error,
    isSuccess,
    refetch,
  };
};

export const useUpdateListingReview = (props: MutationProps) => {
  const { onSuccess, onError } = props;
  const queryClient = useQueryClient();

  const { mutate, isError, isSuccess, isPending } = useMutation({
    mutationFn: (payload: UpdateListingReviewPayload) =>
      putRequest<UpdateListingReviewPayload, UpdateListingReviewResponse>({
        url: "/Admin/review/update",
        payload,
      }),
    onSuccess(values) {
      queryClient.invalidateQueries({ queryKey: [LISTINGS] });
      onSuccess(values);
    },
    onError(err) {
      const msgError = handleApiError(err);
      onError?.(msgError, err);
    },
  });

  return {
    mutate,
    isError,
    isSuccess,
    isPending,
  };
};

export const useFlagContent = (props: MutationProps) => {
  const { onSuccess, onError } = props;
  const queryClient = useQueryClient();

  const { mutate, isError, isSuccess, isPending } = useMutation({
    mutationFn: (payload: FlagContentPayload) =>
      putRequest<FlagContentPayload, FlagContentResponse>({
        url: "/Admin/flag-content",
        payload,
      }),
    onSuccess(values) {
      queryClient.invalidateQueries({ queryKey: [LISTINGS] });
      queryClient.invalidateQueries({ queryKey: [SWAP_ACTIVITY] });
      queryClient.invalidateQueries({ queryKey: ["SWAP_PROCEEDING"] });
      onSuccess(values);
    },
    onError(err) {
      const msgError = handleApiError(err);
      onError?.(msgError, err);
    },
  });

  return {
    mutate,
    isError,
    isSuccess,
    isPending,
  };
};
