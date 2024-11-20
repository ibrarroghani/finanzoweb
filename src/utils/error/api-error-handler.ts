import { AxiosError } from 'axios';

interface AxiosErrorResponse {
  message: string;
  status: number;
}

export const handleApiError = (error: unknown): Error => {
  if ((error as AxiosError).isAxiosError) {
    const axiosError = error as AxiosError<AxiosErrorResponse>;

    if (axiosError.response) {
      return new Error(
        axiosError.response?.data?.message || 'Failed to fetch data'
      );
    } else {
      return new Error('Network error. Please check your internet connection.');
    }
  }

  return new Error('An unknown error occurred');
};
