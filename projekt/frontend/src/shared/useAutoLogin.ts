import { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import { useIsLoggedIn } from 'shared/useIsLoggedIn';

export const useAutoLogin = () => {
  const queryClient = useQueryClient();
  const [isAutoLogin, setIsAutoLogin] = useState(() => {
    const storedAccessToken = localStorage.getItem('token');

    if (storedAccessToken) {
      queryClient.setQueryData('token', storedAccessToken);
    }

    return !!storedAccessToken;
  });

  const { isLoading } = useIsLoggedIn();

  useEffect(() => {
    if (isAutoLogin && !isLoading) {
      setIsAutoLogin(false);
    }
  }, [isAutoLogin, isLoading]);

  return isAutoLogin;
};
