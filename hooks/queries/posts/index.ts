import { postDetailService, postListService } from "@/services";
import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "./query-keys";

export const usePostsList = (params: TParams) => {
  const { data, refetch, isLoading, isError, error } = useQuery({
    queryKey: queryKeys.lists(params),
    queryFn: postListService
  });

  return {
    postsData: data?.data ?? [],
    postRefetch: refetch,
    postIsLoading: isLoading,
    postIsError: isError,
    postError: error as any,
    postPagination: {
      page: parseInt(data?.headers['x-pagination-page']),
      limit: parseInt(data?.headers['x-pagination-limit']),
      total: parseInt(data?.headers['x-pagination-total']),
    }
  }
};

export const usePostsDetail = (id: string | string[] | undefined) => {
  const { data, isLoading } = useQuery({
    queryKey: queryKeys.detail(id),
    queryFn: postDetailService
  });

  return {
    postDetailData: data?.data ?? {},
    postDetailIsLoading: isLoading,
  }
};