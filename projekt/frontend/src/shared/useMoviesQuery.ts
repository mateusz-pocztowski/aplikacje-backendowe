import { useQuery } from 'react-query';
import { BaseAxios } from 'shared/axios';
import { useAuthTokenQuery } from 'shared/useAuthTokenQuery';

export const useMoviesQuery = () => {
  const { data: token } = useAuthTokenQuery();

  return useQuery(['movies-get'], () =>
    BaseAxios.get('/movies', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.data.data)
  );
};

export const useMoviesSingleQuery = (id: string) => {
  const { data: token } = useAuthTokenQuery();

  return useQuery(`movies-get-${id}`, () =>
    BaseAxios.get(`/movies/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.data.data)
  );
};
