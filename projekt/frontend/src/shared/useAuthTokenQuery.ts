import { useQuery } from 'react-query';

export const useAuthTokenQuery = () =>
  useQuery<string | undefined>('token', () => undefined, {
    enabled: false,
    refetchOnMount: false,
    staleTime: Infinity,
    cacheTime: Infinity,
  });
