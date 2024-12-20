import { useMutation, useQueryClient } from '@tanstack/react-query';
import { goalAPIEndpoint } from '@/config/api/api-endpoints/goal-api-endpoint';
import { handleApiError } from '@/utils/error/api-error-handler';
import { notification } from 'antd';

interface IData {
  title: string;
  description: string;
  goal_amount: number;
  // monthlyAmount: string;
  target_date: string;
  goal_status: 'active' | 'paused';
  // progress?: boolean;
}

const useUpdateGoal = (goalSlug: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: IData) => {
      try {
        const response = await goalAPIEndpoint.updateGoal(data, goalSlug);
        return response; // Assuming `data` contains the access token
      } catch (error) {
        throw handleApiError(error);
      }
    },
    onSuccess: () => {
      notification.success({
        message: 'Goal created successfully',
        placement: 'topRight',
      });

      // Add a delay before invalidating the query
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ['getGoals'] }); // Invalidate the goals list query
      }, 1000); // 1000 milliseconds = 1 second
    },
  });
};

export default useUpdateGoal;
