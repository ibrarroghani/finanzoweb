import { PlaidAPIEndpoint } from '@/config/api/api-endpoints/plaid-api-endpoint';
import { useQuery } from '@tanstack/react-query';

const useGetPublicToken = () => {
  return useQuery({
    queryKey: ['getPublicToken'], // Unique key for the query
    queryFn: async () => {
      try {
        const response = await PlaidAPIEndpoint.getPublicToken();
        return response;
      } catch (error) {
        console.log('error', error);
        // throw new Error(
        //   error.response?.data?.message || 'Failed to fetch data'
        // );
      }
    },
  });
};

export default useGetPublicToken;
