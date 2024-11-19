import { PlaidAPIEndpoint } from '@/config/api/api-endpoints/plaid-api-endpoint';
import { useQuery } from '@tanstack/react-query';

const useGetPlaidPublicToken = () => {
  return useQuery({
    queryKey: ['getPlaidPublicToken'], // Unique key for the query
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

export default useGetPlaidPublicToken;
