import { useQuery } from '@tanstack/react-query';
import { chatAPIEndpoint } from '@/config/api/api-endpoints/chat-api-endpoint';
import { handleApiError } from '@/utils/error/api-error-handler';

const useGetConnection = (clientSlug: string) => {
  return useQuery({
    queryKey: ['getConnected', clientSlug], // Unique key for the query
    enabled: !!clientSlug,
    queryFn: async () => {
      try {
        const response = await chatAPIEndpoint.getConnection(clientSlug);
        return response;
      } catch (error) {
        throw handleApiError(error);
      }
    },
  });
};

export default useGetConnection;
