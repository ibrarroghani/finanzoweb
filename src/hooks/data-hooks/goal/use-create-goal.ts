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

const useCreateGoal = () => {
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
        const response = await goalAPIEndpoint.createGoal(data);
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
    onError: (error) => {
      // console.log('error', error);
      notification.error({
        message: error.message,
        placement: 'topRight',
      });
    },
    //retry: false, // Disable automatic retries
    //networkMode: 'always',
  });
};

export default useCreateGoal;
