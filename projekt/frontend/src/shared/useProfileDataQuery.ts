import { useQuery } from 'react-query';
import { useLogout } from 'shared/useLogout';
import { BaseAxios } from 'shared/axios';
import { useAuthTokenQuery } from 'shared/useAuthTokenQuery';

export const useProfileDataQuery = () => {
  const logout = useLogout();

  const { data: token } = useAuthTokenQuery();

  return useQuery(
    'profile',
    () =>
      BaseAxios.get('/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.data.data),
    {
      enabled: !!token,
      onError: () => {
        logout();
      },
      // retry: false,
    }
  );
};
