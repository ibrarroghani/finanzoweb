import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { PlaidAPIEndpoint } from '@/config/api/api-endpoints/plaid-api-endpoint';

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
        // Handle AxiosError (specific error from Axios requests)
        if (error instanceof AxiosError) {
          console.error('Axios error:', error.response?.data || error.message);
          // Throw a specific error for Axios errors
          throw new Error(
            error.response?.data?.message ||
              'Failed to exchange public token due to network issue.'
          );
        }

        // Handle other types of errors (non-Axios)
        if (error instanceof Error) {
          console.error('General error:', error.message);
          throw new Error(error.message || 'Failed to exchange public token.');
        }

        // Handle any unknown errors
        console.error('Unknown error:', error);
        throw new Error('An unknown error occurred during token exchange.');
      }
    },
  });
};

export default useGetPlaidAccessToken;
