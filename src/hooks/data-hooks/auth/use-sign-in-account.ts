import { useMutation } from '@tanstack/react-query';
import { handleApiError } from '@/utils/error/api-error-handler';
import { authAPIEndpoint } from '@/config/api/api-endpoints/auth-api-endpoint';

const useSignInAccount = () => {
  return useMutation({
    mutationFn: async (data) => {
      try {
        const response = await authAPIEndpoint.postSignInAccount(data);
        return response.data;
      } catch (error) {
        throw handleApiError(error);
      }
    },
  });
};

export default useSignInAccount;
