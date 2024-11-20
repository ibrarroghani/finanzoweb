import { useMutation } from '@tanstack/react-query';
import { PlaidAPIEndpoint } from '@/config/api/api-endpoints/plaid-api-endpoint';
import { handleApiError } from '@/utils/error/api-error-handler';

interface IAccessToken {
  public_token: string | null;
}

const useGetPlaidAccessToken = () => {
  return useMutation({
    mutationFn: async (data: IAccessToken) => {
      try {
        const response = await PlaidAPIEndpoint.getAccessToken(data);
        return response.data; // Assuming `data` contains the access token
      } catch (error) {
        throw handleApiError(error);
      }
    },
  });
};

export default useGetPlaidAccessToken;
