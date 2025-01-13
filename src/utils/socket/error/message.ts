import { SOCKET_ERRORS } from '../constants/socketErrors';

export const getSocketErrorMessage = (
  errorType: string,
  errorMessage: string
): string => {
  const errorTypes = Object.values(SOCKET_ERRORS).flatMap((category) =>
    Object.values(category)
  );

  if (errorTypes.includes(errorType)) {
    return errorMessage; // Directly return the server-provided error message
  }

  return 'An unexpected error occurred. Please try again.';
};
