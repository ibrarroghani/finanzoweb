import apiService from '@/utils/services/api-service';

export const accountAPIEndpoint = {
  //eslint-disable-next-line
  getBankAccounts: (slug: string, params: any) =>
    apiService.get(`/institutions/client/${slug}`, { params }),

  //eslint-disable-next-line
  getBankAccountDetails: (slug: string, institution_id: string, params?: any) =>
    apiService.get(`/institutions/client/${slug}/${institution_id}`, {
      params,
    }),
};
