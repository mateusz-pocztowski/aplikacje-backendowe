import { useIsLoggedIn } from 'shared/useIsLoggedIn';
import { Navigate, useLocation } from 'react-router-dom';

export const RequireAuth = ({ children }: any) => {
  const { isLoggedIn, isLoading } = useIsLoggedIn();
  const location = useLocation();

  if (isLoading) {
    return <div>loading...</div>;
  }

  return isLoggedIn ? children : <Navigate to="/login" state={{ from: location }} replace />;
};
