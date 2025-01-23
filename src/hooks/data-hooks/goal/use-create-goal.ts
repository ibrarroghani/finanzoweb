import { useMutation, useQueryClient } from '@tanstack/react-query';
import { goalAPIEndpoint } from '@/config/api/api-endpoints/goal-api-endpoint';
import { handleApiError } from '@/utils/error/api-error-handler';
import { notification } from 'antd';
import { checkInternetConnection } from '@/utils/error/check-internet-connection';

interface IData {
  title: string;
  goal_purpose: string;
  description: string;
  goal_amount: number;
  // monthlyAmount: string;
  target_date: string;
  goal_status: 'active' | 'paused';
}

const useCreateGoal = (slug: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['createGoalMutation'],
    mutationFn: async (data: IData) => {
      if (!checkInternetConnection()) {
        throw new Error(
          'Network error. Please check your internet connection.'
        );
      }
      try {
        const response = await goalAPIEndpoint.createGoal(slug, data);
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

export default useCreateGoal;
