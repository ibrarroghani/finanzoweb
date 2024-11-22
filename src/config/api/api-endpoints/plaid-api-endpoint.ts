import apiService from '@/utils/services/api-service';

interface IAccessToken {
  public_token: string | null;
}

interface IPlaindToken {
  plaid_institution_access_token: string | null;
}
export const plaidAPIEndpoint = {
  getPublicToken: () => apiService.post('/plaid/create-link-token'),
  getAccessToken: (data: IAccessToken) =>
    apiService.post('/plaid/exchange-public-token', data),
  getAccount: (data: IPlaindToken) =>
    apiService.post('/institutions/connect', data),
};
