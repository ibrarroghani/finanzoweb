import { useMutation, useQueryClient } from '@tanstack/react-query';
import { goalAPIEndpoint } from '@/config/api/api-endpoints/goal-api-endpoint';
import { handleApiError } from '@/utils/error/api-error-handler';
import { notification } from 'antd';
import { checkInternetConnection } from '@/utils/error/check-internet-connection';

interface IData {
  title: string;
  description: string;
  goal_amount: number;
  // monthlyAmount: string;
  target_date: string;
  goal_status: 'active' | 'paused';
  // progress?: boolean;
}

const useUpdateGoal = (userSlug: string, goalSlug: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['updateGoalMutation'],
    mutationFn: async (data: IData) => {
      if (!checkInternetConnection()) {
        throw new Error(
          'Network error. Please check your internet connection.'
        );
      }
      try {
        const response = await goalAPIEndpoint.updateGoal(
          userSlug,
          goalSlug,
          data
        );
        return response;
      } catch (error) {
        throw handleApiError(error);
      }
    },
    onSuccess: () => {
      notification.success({
        message: 'Goal Updated successfully',
        placement: 'topRight',
      });

      queryClient.invalidateQueries({ queryKey: ['getGoals'] }); // Invalidate the goals list query
    },
    onError: (error) => {
      // console.log('error', error);
      notification.error({
        message: error.message,
        placement: 'topRight',
      });
    },
  });
};

export default useUpdateGoal;
