import { useQuery } from '@tanstack/react-query';
import { sidebarAPIEndpoint } from '@/config/api/api-endpoints/sidebar-api-endpoint';
import { handleApiError } from '@/utils/error/api-error-handler';

//eslint-disable-next-line
const useGetClients = (params?: any) => {
  return useQuery({
    queryKey: ['getGoals', params], // Unique key for the query
    queryFn: async () => {
      try {
        const response = await sidebarAPIEndpoint.getClients(params);
        return response;
      } catch (error) {
        throw handleApiError(error);
      }
    },
  });
};

export default useGetClients;
