import { authorizedHttpClient } from "@/api/apiClient";
import type { Company } from '../models/Company'
import { COMPANY_ENDPOINTS } from '@/constant/apiConstant';

class UserService {
  public async getCompanies(): Promise<Company[]> {
    const response = await authorizedHttpClient.get<Company[]>(
      COMPANY_ENDPOINTS.GET_ALL
    );
    return response as Company[];
  }

  public async addCompany(payload: Company): Promise<void> {
    const response = await authorizedHttpClient.post<string, Company>(
      `${COMPANY_ENDPOINTS.POST}/create`,
      payload
    );
    return response.data as any;
  }

  public async updateCompany(payload: Company, _id: number): Promise<void> {
    const response = await authorizedHttpClient.put<string, Company>(
      COMPANY_ENDPOINTS.UPDATE(_id),
      payload
    );

    return response.data as any;
  }
}

export default new UserService();
