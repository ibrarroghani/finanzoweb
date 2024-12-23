import { useQuery } from '@tanstack/react-query';
import { goalAPIEndpoint } from '@/config/api/api-endpoints/goal-api-endpoint';
import { handleApiError } from '@/utils/error/api-error-handler';

//eslint-disable-next-line
const useGetSingleGoal = (goalSlug: string) => {
  return useQuery({
    queryKey: ['getGoal', goalSlug], // Unique key for the query
    enabled: !!goalSlug,
    queryFn: async () => {
      try {
        const response = await goalAPIEndpoint.getSingleGoal(goalSlug);
        return response;
      } catch (error) {
        throw handleApiError(error);
      }
    },
  });
};

export default useGetSingleGoal;
