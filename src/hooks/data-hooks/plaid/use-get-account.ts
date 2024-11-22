import { useMutation } from '@tanstack/react-query';
import { plaidAPIEndpoint } from '@/config/api/api-endpoints/plaid-api-endpoint';
import { handleApiError } from '@/utils/error/api-error-handler';

interface IAccessToken {
  plaid_institution_access_token: string | null;
}

const useGetAccount = () => {
  return useMutation({
    mutationFn: async (data: IAccessToken) => {
      try {
        const response = await plaidAPIEndpoint.getAccount(data);
        return response.data; // Assuming `data` contains the access token
      } catch (error) {
        throw handleApiError(error);
      }
    },
  });
};

export default useGetAccount;
