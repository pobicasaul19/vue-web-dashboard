import { authorizedHttpClient } from "@/api/apiClient";
import type { Article, ArticlePayload } from '../models/Article'
import { ARTICLE_ENDPOINT } from '@/constant/apiConstant';

class ArticleService {
  public async getArticles(): Promise<Article[]> {
    const response = await authorizedHttpClient.get<Article[]>(
      ARTICLE_ENDPOINT.GET_ALL
    );
    console.log(response)
    return response as Article[];
  }

  public async addArticle(payload: ArticlePayload): Promise<void> {
    const response = await authorizedHttpClient.post<string, ArticlePayload>(
      `${ARTICLE_ENDPOINT.POST}/create`,
      payload
    );
    return response.data as any;
  }

  public async updateArticle(payload: ArticlePayload, _id: number): Promise<void> {
    const response = await authorizedHttpClient.put<string, ArticlePayload>(
      ARTICLE_ENDPOINT.UPDATE(_id),
      payload
    );

    return response.data as any;
  }
}

export default new ArticleService();
