import { useQuery } from '@tanstack/react-query';
import { goalAPIEndpoint } from '@/config/api/api-endpoints/goal-api-endpoint';
import { handleApiError } from '@/utils/error/api-error-handler';

//eslint-disable-next-line
const useGetGoals = (slug: string, params: any) => {
  return useQuery({
    queryKey: ['getGoals', slug, params], // Unique key for the query
    enabled: !!slug,
    queryFn: async () => {
      try {
        const response = await goalAPIEndpoint.getGoals(slug, params);
        return response;
      } catch (error) {
        throw handleApiError(error);
      }
    },
  });
};

export default useGetGoals;
