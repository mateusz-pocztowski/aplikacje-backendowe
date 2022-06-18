import { FC } from 'react';
import { useProfileDataQuery } from 'shared/useProfileDataQuery';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { isAdmin, roleMap } from 'pages/Profile';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { MoviesList } from 'shared/MoviesList';
import { useLogout } from 'shared/useLogout';
import { CreateMovie } from 'shared/CreateMovie';

const theme = createTheme();

export const Homepage: FC = () => {
  const { data } = useProfileDataQuery();
  const logout = useLogout();

  return (
    <ThemeProvider theme={theme}>
      <Container component="main">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography component="h3" variant="h6">
            USER ID: <strong>{String(data?.id)}</strong>
          </Typography>
          <Typography component="h3" variant="h6">
            EMAIL: <strong>{String(data?.email)}</strong>
          </Typography>
          <Typography component="h3" variant="h6">
            ROLE: <strong>{String((roleMap as any)[data?.role])}</strong>
          </Typography>
          {!data ? (
            <div>
              <Link to="/login">
                <Button variant="outlined">Logowanie</Button>
              </Link>
              <Link to="/register">
                <Button variant="outlined">Rejestracja</Button>
              </Link>
            </div>
          ) : (
            <div>
              <Button onClick={logout} variant="outlined">
                Wyloguj
              </Button>
            </div>
          )}
        </Box>

        <MoviesList />
        {isAdmin(data?.role) && <CreateMovie />}
      </Container>
    </ThemeProvider>
  );
};
