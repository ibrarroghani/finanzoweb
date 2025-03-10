import { useQuery } from '@tanstack/react-query';
import { accountAPIEndpoint } from '@/config/api/api-endpoints/account-api-endpoint';
import { handleApiError } from '@/utils/error/api-error-handler';

const useGetTransactionByAccount = (
  accountId: string,
  clintSlug: string,
  //eslint-disable-next-line
  params: any
) => {
  return useQuery({
    queryKey: ['getTransactionByAccount', accountId, clintSlug, params],
    enabled: !!accountId && !!clintSlug,

    queryFn: async () => {
      try {
        const response = await accountAPIEndpoint.getTransactionByAccount(
          accountId,
          clintSlug,
          params
        );
        return response;
      } catch (error) {
        throw handleApiError(error);
      }
    },
  });
};

export default useGetTransactionByAccount;
