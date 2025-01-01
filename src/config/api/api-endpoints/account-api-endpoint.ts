import apiService from '@/utils/services/api-service';

export const accountAPIEndpoint = {
  //eslint-disable-next-line
  getBankAccounts: (slug: string, params: any) =>
    apiService.get(`/institutions/client/${slug}`, { params }),

  //eslint-disable-next-line
  getBankAccountDetails: (institution_id: string, params?: any) =>
    apiService.get(
      `/institutions/client/user-8abe9a22-a593-11ef-878e-6045bd08fbb0-8abe9a26-a593-11ef-878e-6045bd08fbb0/${institution_id}`,
      { params }
    ),
};
