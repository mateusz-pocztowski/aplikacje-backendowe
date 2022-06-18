import { FC } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useMoviesSingleQuery } from 'shared/useMoviesQuery';
import { useProfileDataQuery } from 'shared/useProfileDataQuery';
import { isAdmin } from 'pages/Profile';
import { useDeleteMovieMutation } from 'shared/useCRUDMovieMutation';
import { useQueryClient } from 'react-query';

const theme = createTheme();

export const Movie: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data } = useMoviesSingleQuery(id!);
  const { mutate } = useDeleteMovieMutation();
  const { data: profileData } = useProfileDataQuery();

  const queryClient = useQueryClient();

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
          <Link to="/">
            <Button variant="outlined">Go back</Button>
          </Link>
          <Typography component="h3" variant="h6">
            ID: <strong>{String(data?.id)}</strong>
          </Typography>
          <Typography component="h3" variant="h6">
            NAME: <strong>{String(data?.name)}</strong>
          </Typography>
          <Typography component="h3" variant="h6">
            GENRE: <strong>{String(data?.genre)}</strong>
          </Typography>
          <Typography component="h3" variant="h6">
            RATE: <strong>{String(data?.rate)}</strong>
          </Typography>
          <Typography component="h3" variant="h6">
            RATE COUNT: <strong>{String(data?.rateCount)}</strong>
          </Typography>
          <Typography component="h3" variant="h6">
            YOUR RATE: <strong>{String(data?.userRate ?? '-')}</strong>
          </Typography>
          {isAdmin(profileData?.role) && (
            <Box
              sx={{
                display: 'flex',
                gap: '4px',
                marginTop: 1,
              }}
            >
              <Button
                onClick={() => {
                  mutate(
                    { id },
                    {
                      onSuccess: () => {
                        queryClient.invalidateQueries(['movies-get']);
                        navigate('/');
                      },
                    }
                  );
                }}
                variant="outlined"
                color="error"
              >
                Delete
              </Button>
            </Box>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
};
