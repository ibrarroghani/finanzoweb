import ApiService from '@/utils/services/api-service';

interface IAccessToken {
  public_token: string | null;
}

export const PlaidAPIEndpoint = {
  getPublicToken: () => ApiService.post('/plaid/create-link-token'),
  getAccessToken: (data: IAccessToken) =>
    ApiService.post('/plaid/exchange-public-token', data),
};
