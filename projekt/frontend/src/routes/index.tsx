import { FC } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';

import { Homepage } from 'pages/Homepage';
import { Login } from 'pages/Login';
import { Register } from 'pages/Register';
import { Profile } from 'pages/Profile';
import { Movie } from 'pages/Movie';
import { RequireAuth } from 'shared/RequireAuth';
import { useAutoLogin } from 'shared/useAutoLogin';

export const Router: FC = () => {
  const isAutoLogin = useAutoLogin();

  if (isAutoLogin) {
    return <div>loading...</div>;
  }

  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/movie/:id" element={<Movie />} />
      <Route
        element={
          <RequireAuth>
            <Outlet />
          </RequireAuth>
        }
      >
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
};
