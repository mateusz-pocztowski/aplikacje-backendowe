import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from 'react-query';

export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const logout = useCallback(() => {
    queryClient.clear();
    localStorage.removeItem('token');

    navigate('/');
  }, [queryClient, navigate]);

  return logout;
};
