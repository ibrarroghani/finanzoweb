import { ISignUpPayloadData } from '@/app/sign-up/interfaces/sign-up-interface';
import apiService from '@/utils/services/api-service';

export const authAPIEndpoint = {
  //eslint-disable-next-line
  postSignInAccount: (data: any) => apiService.post('/login', data),

  postSignUpAccount: (data: ISignUpPayloadData) =>
    apiService.post('/sign-up', data),

  //eslint-disable-next-line
  postOtpValidation: (data: any) => apiService.post('/otp', data),

  //eslint-disable-next-line
  postNewPassword: (data: any) => apiService.post('/password', data),
};
