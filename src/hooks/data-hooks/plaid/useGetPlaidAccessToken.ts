import { useMutation } from '@tanstack/react-query';
import { PlaidAPIEndpoint } from '@/config/api/api-endpoints/plaid-api-endpoint';

interface IAccessToken {
  public_token: string | null;
}

const useGetPlaidAccessToken = () => {
  // const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: IAccessToken) => {
      try {
        const response = await PlaidAPIEndpoint.getAccessToken(data);
        return response;
      } catch (error) {
        console.log('error', error);
        // throw new Error(
        //   error.response?.data?.message || 'Failed to create account'
        // );
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

export default useGetPlaidAccessToken;
