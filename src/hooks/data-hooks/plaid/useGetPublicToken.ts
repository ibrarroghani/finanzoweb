import { PlaidAPIEndpoint } from '@/config/api/api-endpoints/plaid-api-endpoint';
import { handleApiError } from '@/utils/error/api-error-handler';
import { useQuery } from '@tanstack/react-query';

const useGetPublicToken = () => {
  return useQuery({
    queryKey: ['getPublicToken'],
    queryFn: async () => {
      try {
        const response = await PlaidAPIEndpoint.getPublicToken();
        return response;
      } catch (error) {
        throw handleApiError(error);
      }
    },
  });
};

export default useGetPublicToken;
