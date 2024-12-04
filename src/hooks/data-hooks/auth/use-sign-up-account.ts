import { useMutation } from '@tanstack/react-query';
import { handleApiError } from '@/utils/error/api-error-handler';
import { authAPIEndpoint } from '@/config/api/api-endpoints/auth-api-endpoint';
import { ISignUpPayloadData } from '@/app/sign-up/interfaces/sign-up-interface';

const useSignUpAccount = () => {
  return useMutation({
    mutationFn: async (data: ISignUpPayloadData) => {
      try {
        const response = await authAPIEndpoint.postSignUpAccount(data);
        return response.data;
      } catch (error) {
        throw handleApiError(error);
      }
    },
  });
};

export default useSignUpAccount;
