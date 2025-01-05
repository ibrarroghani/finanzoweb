/* eslint-disable @typescript-eslint/no-explicit-any */
import { SOCKET_ERRORS } from '../../socket/constants/socketErrors';

export const handleSocketErrors = (socket: any) => {
  // Iterate through each error type and attach listeners
  Object.values(SOCKET_ERRORS).forEach((category) => {
    Object.values(category).forEach((errorType) => {
      socket.on(errorType, (errorMessage: string) => {
        // Process the error message
        const displayMessage = getSocketErrorMessage(errorType, errorMessage);
        console.error('Socket Error:', displayMessage);

        // You can display this message in your UI
        alert(displayMessage); // Example: show an alert with the error message
      });
    });
  });
};
