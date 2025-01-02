import { useQuery } from '@tanstack/react-query';
import { chatAPIEndpoint } from '@/config/api/api-endpoints/chat-api-endpoint';
import { handleApiError } from '@/utils/error/api-error-handler';

//eslint-disable-next-line
const useGetConnectMessage = (params?: any) => {
  return useQuery({
    queryKey: ['getConnectMessage', params], // Unique key for the query
    queryFn: async () => {
      try {
        const response = await chatAPIEndpoint.getConnectMessage(params);
        return response;
      } catch (error) {
        throw handleApiError(error);
      }
    },
  });
};

export default useGetConnectMessage;
