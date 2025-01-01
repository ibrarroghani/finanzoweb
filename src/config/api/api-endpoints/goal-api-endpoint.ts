import apiService from '@/utils/services/api-service';

export const goalAPIEndpoint = {
  //eslint-disable-next-line
  getGoals: (slug: string, params: any) =>
    apiService.get(`/goals/client/${slug}`, { params }),

  getSingleGoal: (slug: string, goalSlug: string) =>
    apiService.get(`/goals/client/${slug}/${goalSlug}`),

  //eslint-disable-next-line
  createGoal: (data: any) =>
    apiService.post(
      '/goals/client/user-8abe9a22-a593-11ef-878e-6045bd08fbb0-8abe9a26-a593-11ef-878e-6045bd08fbb0',
      data
    ),

  //eslint-disable-next-line
  updateGoal: (data: any, goalSlug: string) =>
    apiService.put(
      `/goals/client/user-8abe9a22-a593-11ef-878e-6045bd08fbb0-8abe9a26-a593-11ef-878e-6045bd08fbb0/${goalSlug}`,
      data
    ),
};
