import { httpClient } from '../api/apiClient';
import type { loginData } from "@/models/Authentication";
import { AUTH_ENDPOINTS } from "../constant/apiConstant";

class LoginService {
  public async validateLogin(payload: loginData): Promise<any> {
    const response = await httpClient.post<any, loginData>(
      AUTH_ENDPOINTS.POST_LOGIN,
      payload
    );
    return response.data as any;
  }
}
export default new LoginService();
