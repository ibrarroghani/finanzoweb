import apiService from '@/utils/services/api-service';

export const goalAPIEndpoint = {
  //eslint-disable-next-line
  getGoals: (params: any) =>
    apiService.get(
      '/goals/client/user-8abe9a22-a593-11ef-878e-6045bd08fbb0-8abe9a26-a593-11ef-878e-6045bd08fbb0',
      { params }
    ),

  //eslint-disable-next-line
  getBankAccountDetails: (institution_id: string, params?: any) =>
    apiService.get(
      `/institutions/client/user-8abe9a22-a593-11ef-878e-6045bd08fbb0-8abe9a26-a593-11ef-878e-6045bd08fbb0/${institution_id}`,
      { params }
    ),
};
