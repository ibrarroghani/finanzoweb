import { useQuery } from '@tanstack/react-query';
import { accountAPIEndpoint } from '@/config/api/api-endpoints/account-api-endpoint';
import { handleApiError } from '@/utils/error/api-error-handler';

//eslint-disable-next-line
const useGetGroupAccounts = (slug: string, params?: any) => {
  return useQuery({
    queryKey: ['getGroupAccounts', slug],
    enabled: !!slug,

    queryFn: async () => {
      try {
        const response = await accountAPIEndpoint.getGroupAccounts(
          slug,
          params
        );
        return response;
      } catch (error) {
        throw handleApiError(error);
      }
    },
  });
};

export default useGetGroupAccounts;
