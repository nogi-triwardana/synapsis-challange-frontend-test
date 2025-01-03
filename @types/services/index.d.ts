import { QueryFunctionContext } from "@tanstack/react-query";
import { queryKeys as postQueryKeys } from "@/hooks/queries/posts/query-keys";
import { queryKeys as userQueryKeys } from "@/hooks/queries/users/query-keys";

export type TPostListService = QueryFunctionContext<ReturnType<typeof postQueryKeys['lists']>>;

export type TPostDetailService = QueryFunctionContext<ReturnType<typeof postQueryKeys['detail']>>;

export type TPostListService = QueryFunctionContext<ReturnType<typeof postQueryKeys['lists']>>;

export type TUserListService = QueryFunctionContext<ReturnType<typeof userQueryKeys['lists']>>;