import apiService from '@/utils/services/api-service';

export const accountAPIEndpoint = {
  //eslint-disable-next-line
  getBankInstitutions: (slug: string, params: any) =>
    apiService.get(`/institutions/client/${slug}`, { params }),

  //eslint-disable-next-line
  getBankAccounts: (slug: string, params: any) =>
    apiService.get(`/accounts/flat/client/${slug}`, { params }),

  getBankInstitutionDetails: (
    slug: string,
    institution_id: string,
    //eslint-disable-next-line
    params?: any
  ) =>
    apiService.get(`/institutions/client/${slug}/${institution_id}`, {
      params,
    }),
};
