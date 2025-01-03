import { TUserListService } from "@/@types/services";
import axiosInstance from "@/config/api";

export const userListService = async ({
  queryKey: [ , params]
}: TUserListService) => {
  const response = await axiosInstance.get('/users', { params });

  return response;
}