import apiService from '@/utils/services/api-service';

export const chatAPIEndpoint = {
  //eslint-disable-next-line
  getConnectMessage: (params: any) =>
    apiService.get(
      'messages/user-8abe9a22-a593-11ef-878e-6045bd08fbb0-8abe9a26-a593-11ef-878e-6045bd08fbb0',
      { params }
    ),

  //eslint-disable-next-line
  getMessages: (connect_slug_id: string, params?: any) =>
    apiService.get(`/messages/thread/${connect_slug_id}`, { params }),

  //eslint-disable-next-line
  sendMessage: (data: any, connect_slug_id: string) =>
    apiService.post(`/messages/thread/${connect_slug_id}/send`, data),
};
