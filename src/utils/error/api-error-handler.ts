import { AxiosError } from 'axios';

interface IAxiosErrorResponse {
  message: string;
  status: number;
}

export const handleApiError = (error: unknown): Error => {
  if ((error as AxiosError).isAxiosError) {
    const axiosError = error as AxiosError<IAxiosErrorResponse>;

    if (axiosError.response) {
      return new Error(
        axiosError.response?.data?.message || 'Failed to fetch data'
      );
    } else {
      return new Error('Network error. Please check your internet connection.');
    }
  }

  if (error instanceof Error) {
    return new Error(error.message || 'An unknown error occurred');
  }

  return new Error('An unknown error occurred');
};
