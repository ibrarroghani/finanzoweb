import apiService from '@/utils/services/api-service';

export const goalAPIEndpoint = {
  //eslint-disable-next-line
  getGoals: (slug: string, params: any) =>
    apiService.get(`/goals/client/${slug}`, { params }),

  getSingleGoal: (slug: string, goalSlug: string) =>
    apiService.get(`/goals/client/${slug}/${goalSlug}`),

  //eslint-disable-next-line
  createGoal: (slug: string, data: any) =>
    apiService.post(`/goals/client/${slug}`, data),

  //eslint-disable-next-line
  updateGoal: (userSlug: string, goalSlug: string, data: any) =>
    apiService.put(`/goals/client/${userSlug}/${goalSlug}`, data),
};
