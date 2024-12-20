import { useQuery } from '@tanstack/react-query';
import { accountAPIEndpoint } from '@/config/api/api-endpoints/account-api-endpoint';
import { handleApiError } from '@/utils/error/api-error-handler';

const useGetBankAccountDetails = (
  institution_id: string,
  //eslint-disable-next-line
  params?: any
) => {
  return useQuery({
    queryKey: ['getBankAccountDetails', institution_id], // Unique key for the query
    enabled: !!institution_id,
    queryFn: async () => {
      try {
        const response = await accountAPIEndpoint.getBankAccountDetails(
          institution_id,
          params
        );
        return response;
      } catch (error) {
        throw handleApiError(error);
      }
    },
  });
};

export default useGetBankAccountDetails;
