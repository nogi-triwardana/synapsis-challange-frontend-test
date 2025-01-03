import { TPostDetailService, TPostListService } from "@/@types/services";
import axiosInstance from "@/config/api";

export const postListService = async ({
  queryKey: [ , params]
}: TPostListService) => {
  const response = await axiosInstance.get('/posts', { params });

  return response;
}

export const postDetailService = async ({
  queryKey: [ , , id]
}: TPostDetailService) => {
  const response = await axiosInstance.get(`/posts/${id}`);

  return response;
}

export const postCreateService = async ({ payload, user }: any) => {
  const response = await axiosInstance.post(`/users/${user?.id}/posts`, payload);

  return response;
}

export const postUpdateService = async ({ payload, id }: any) => {
  const response = await axiosInstance.put(`/posts/${id}`, payload);

  return response;
}

export const postDeleteService = async (id: number | null) => {
  const response = await axiosInstance.delete(`/posts/${id}`);

  return response;
}