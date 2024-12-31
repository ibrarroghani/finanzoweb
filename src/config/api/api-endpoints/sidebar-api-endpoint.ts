import apiService from '@/utils/services/api-service';

export const sidebarAPIEndpoint = {
  //eslint-disable-next-line
  getClients: (params: any) => apiService.get('/clients', { params }),
};
