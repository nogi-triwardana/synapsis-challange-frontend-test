import { userListService } from "@/services";
import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "./query-keys";

export const useUsersList = (params: TParams, { ...queryProps }) => {
  const { data, refetch, isLoading, isError, error } = useQuery({
    queryKey: queryKeys.lists(params),
    queryFn: userListService,
    ...queryProps
  });

  return {
    usersData: data?.data ?? [],
    userRefetch: refetch,
    userIsLoading: isLoading,
    userIsError: isError,
    userError: error as any,
    userPagination: {
      page: parseInt(data?.headers['x-pagination-page']),
      limit: parseInt(data?.headers['x-pagination-limit']),
      total: parseInt(data?.headers['x-pagination-total']),
    }
  }
};
