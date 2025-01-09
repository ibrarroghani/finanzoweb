import apiService from '@/utils/services/api-service';

export const chatAPIEndpoint = {
  getConnection: (clientSlug: string) =>
    apiService.get(`messages/${clientSlug}`),

  //eslint-disable-next-line
  getMessages: (connect_slug_id: string, params?: any) =>
    apiService.get(`/messages/thread/${connect_slug_id}`, { params }),

  //eslint-disable-next-line
  sendMessage: (data: any, connect_slug_id: string) =>
    apiService.post(`/messages/thread/${connect_slug_id}/send`, data),
};
