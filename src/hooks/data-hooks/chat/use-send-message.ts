import { useMutation, useQueryClient } from '@tanstack/react-query';
import { chatAPIEndpoint } from '@/config/api/api-endpoints/chat-api-endpoint';
import { handleApiError } from '@/utils/error/api-error-handler';
import { notification } from 'antd';
import { checkInternetConnection } from '@/utils/error/check-internet-connection';

interface IData {
  message: string;
}

const useSendMessage = (connection_slug_id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['sendMessageMutation'],
    mutationFn: async (data: IData) => {
      if (!checkInternetConnection()) {
        throw new Error(
          'Network error. Please check your internet connection.'
        );
      }
      try {
        const response = await chatAPIEndpoint.sendMessage(
          data,
          connection_slug_id
        );
        return response; // Assuming `data` contains the access token
      } catch (error) {
        throw handleApiError(error);
      }
    },
    onSuccess: () => {
      //   notification.success({
      //     message: 'Goal created successfully',
      //     placement: 'topRight',
      //   });

      // Add a delay before invalidating the query

      queryClient.invalidateQueries({ queryKey: ['getMessages'] }); // Invalidate the goals list query
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

export default useSendMessage;
