import { authorizedHttpClient } from "@/api/apiClient";
import type { User, UserPayload } from "@/models/User";
import { USER_ENDPOINTS } from '@/constant/apiConstant';

class UserService {
  public async getUsers(): Promise<User[]> {
    const response = await authorizedHttpClient.get<User[]>(
      USER_ENDPOINTS.GET_ALL
    );
    return response as User[];
  }

  public async addUser(payload: UserPayload): Promise<void> {
    const response = await authorizedHttpClient.post<string, UserPayload>(
      `${USER_ENDPOINTS.POST}/create`,
      payload
    );
    return response.data as any;
  }

  public async updateUser(payload: UserPayload, _id: number): Promise<void> {
    const response = await authorizedHttpClient.put<string, UserPayload>(
      USER_ENDPOINTS.UPDATE(_id),
      payload
    );

    return response.data as any;
  }
}

export default new UserService();
