import { useMutation } from '@tanstack/react-query';
import { plaidAPIEndpoint } from '@/config/api/api-endpoints/plaid-api-endpoint';
import { handleApiError } from '@/utils/error/api-error-handler';

const useGetPlaidPublicToken = () => {
  return useMutation({
    mutationFn: async () => {
      try {
        const response = await plaidAPIEndpoint.getPublicToken();
        return response.data; // Assuming `data` contains the link token
      } catch (error) {
        throw handleApiError(error);
      }
    },
  });
};

export default useGetPlaidPublicToken;
