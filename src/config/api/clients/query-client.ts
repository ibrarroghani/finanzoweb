import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false, // Number of retry attempts if a query fails
      refetchOnWindowFocus: false, // Refetch on window focus
      refetchOnMount: true, // Refetch every time the component mounts
      refetchOnReconnect: true, // Refetch on reconnect
      staleTime: 0, // Data is considered stale immediately
    },
    mutations: {
      retry: false, // Number of retry attempts if a query fails
      networkMode: 'always',
    },
  },
});

export default queryClient;
