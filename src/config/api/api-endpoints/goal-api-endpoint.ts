import { IGoalApiRequest } from '@/app/goals/interface/goal-interface';
import apiService from '@/utils/services/api-service';

export const goalAPIEndpoint = {
  //eslint-disable-next-line
  getGoals: (slug: string, params: any) =>
    apiService.get(`/goals/client/${slug}`, { params }),

  getSingleGoal: (slug: string, goalSlug: string) =>
    apiService.get(`/goals/client/${slug}/${goalSlug}`),

  createGoal: (slug: string, data: IGoalApiRequest) =>
    apiService.post(`/goals/client/${slug}`, data),

  //eslint-disable-next-line
  getGoalChart: (clientSlug: string, goalSlug: string, data: any) =>
    apiService.post(`/goals/snapshots/client/${clientSlug}/${goalSlug}`, data),

  updateGoal: (userSlug: string, goalSlug: string, data: IGoalApiRequest) =>
    apiService.put(`/goals/client/${userSlug}/${goalSlug}`, data),
};
