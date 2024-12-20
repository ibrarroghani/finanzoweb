import { useQuery } from '@tanstack/react-query';
import { accountAPIEndpoint } from '@/config/api/api-endpoints/account-api-endpoint';
import { handleApiError } from '@/utils/error/api-error-handler';

//eslint-disable-next-line
const useGetBankAccounts = (params: any) => {
  return useQuery({
    queryKey: ['getBankAccounts', params], // Unique key for the query
    queryFn: async () => {
      try {
        const response = await accountAPIEndpoint.getBankAccounts(params);
        return response;
      } catch (error) {
        throw handleApiError(error);
      }
    },
  });
};

export default useGetBankAccounts;
