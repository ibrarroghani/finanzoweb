import { useMutation } from '@tanstack/react-query';
import { PlaidAPIEndpoint } from '@/config/api/api-endpoints/plaid-api-endpoint';
import { handleApiError } from '@/utils/error/api-error-handler';

interface IAccessToken {
  public_token: string | null;
}

const useGetAccessToken = () => {
  // const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: IAccessToken) => {
      try {
        const response = await PlaidAPIEndpoint.getAccessToken(data);
        return response;
      } catch (error) {
        throw handleApiError(error);
      }
    },
    // onSuccess: () => {
    //   // Add a delay before invalidating the query
    //   setTimeout(() => {
    //     queryClient.invalidateQueries(['getPublicToken']); // Invalidate the accounts list query
    //   }, 1000); // 1000 milliseconds = 1 second
    // },
  });
};

export default useGetAccessToken;
