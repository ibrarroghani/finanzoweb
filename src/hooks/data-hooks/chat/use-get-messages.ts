import { useQuery } from '@tanstack/react-query';
import { chatAPIEndpoint } from '@/config/api/api-endpoints/chat-api-endpoint';
import { handleApiError } from '@/utils/error/api-error-handler';

//eslint-disable-next-line
const useGetMessages = (connect_slug_id: string, params?: any) => {
  return useQuery({
    queryKey: ['getMessages', connect_slug_id], // Unique key for the query
    enabled: !!connect_slug_id,
    refetchInterval: 10000,
    queryFn: async () => {
      try {
        const response = await chatAPIEndpoint.getMessages(
          connect_slug_id,
          params
        );
        return response;
      } catch (error) {
        throw handleApiError(error);
      }
    },
  });
};

export default useGetMessages;
