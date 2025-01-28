import { useQuery } from '@tanstack/react-query';
import { accountAPIEndpoint } from '@/config/api/api-endpoints/account-api-endpoint';
import { handleApiError } from '@/utils/error/api-error-handler';

const useGetBankInstitutionDetails = (
  slug: string,
  institution_id: string,
  //eslint-disable-next-line
  params?: any
) => {
  return useQuery({
    queryKey: ['getBankInstitutionDetails', slug, institution_id, params], // Unique key for the query
    enabled: !!institution_id && !!slug,
    queryFn: async () => {
      try {
        const response = await accountAPIEndpoint.getBankInstitutionDetails(
          slug,
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

export default useGetBankInstitutionDetails;
