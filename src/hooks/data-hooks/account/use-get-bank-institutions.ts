import { useQuery } from '@tanstack/react-query';
import { accountAPIEndpoint } from '@/config/api/api-endpoints/account-api-endpoint';
import { handleApiError } from '@/utils/error/api-error-handler';

//eslint-disable-next-line
const useGetBankInstitutions = (slug: string, params: any) => {
  return useQuery({
    queryKey: ['getBankInstitutions', slug, params], // Unique key for the query
    enabled: !!slug,
    queryFn: async () => {
      try {
        const response = await accountAPIEndpoint.getBankInstitutions(
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

export default useGetBankInstitutions;
