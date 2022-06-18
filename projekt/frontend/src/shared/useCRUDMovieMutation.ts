import { useMutation } from 'react-query';
import { BaseAxios } from 'shared/axios';
import { useAuthTokenQuery } from 'shared/useAuthTokenQuery';

export const useCreateMovieMutation = () => {
  const { data: token } = useAuthTokenQuery();

  return useMutation('movie-create', (data: any) =>
    BaseAxios.post(`/movies`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  );
};

export const useEditMovieMutation = () => {
  const { data: token } = useAuthTokenQuery();

  return useMutation(`movie-edit`, ({ id, name, genre }: any) =>
    BaseAxios.put(
      `/movies/${id}`,
      { name, genre },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
  );
};

export const useDeleteMovieMutation = () => {
  const { data: token } = useAuthTokenQuery();

  return useMutation(`movie-delete`, ({ id }: any) =>
    BaseAxios.delete(`/movies/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  );
};

export const useRateMovieMutation = () => {
  const { data: token } = useAuthTokenQuery();

  return useMutation(`movie-rate`, ({ id, rate }: any) =>
    BaseAxios.post(
      `/movies/rate/${id}`,
      {
        rate,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
  );
};
