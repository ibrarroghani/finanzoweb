import ApiService from '@/utils/services/api-service';

interface IAccessToken {
  public_token: string | null;
}

export const PlaidAPIEndpoint = {
  getPublicToken: () => ApiService.post('/api/create_link_token'),
  getAccessToken: (data: IAccessToken) =>
    ApiService.post('/api/exchange-public-token', data),
};
