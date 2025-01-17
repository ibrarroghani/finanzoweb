import { useMutation } from '@tanstack/react-query';
import { chatAPIEndpoint } from '@/config/api/api-endpoints/chat-api-endpoint';
import { handleApiError } from '@/utils/error/api-error-handler';
import { notification } from 'antd';
import { checkInternetConnection } from '@/utils/error/check-internet-connection';

const useFileUpload = (message_slug: string) => {
  //const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['sendFileMutation'],
    mutationFn: async (data: FormData) => {
      if (!checkInternetConnection()) {
        throw new Error(
          'Network error. Please check your internet connection.'
        );
      }
      try {
        const response = await chatAPIEndpoint.uploadFile(data, message_slug);
        return response; // Assuming `data` contains the access token
      } catch (error) {
        throw handleApiError(error);
      }
    },
    onSuccess: () => {
      //   notification.success({
      //     message: 'File Upload Success',
      //     placement: 'topRight',
      //   });
      // Add a delay before invalidating the query
      //queryClient.invalidateQueries({ queryKey: ['getMessages'] }); // Invalidate the goals list query
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

export default useFileUpload;
