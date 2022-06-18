import { useFormik } from 'formik';
import { useMutation, useQueryClient } from 'react-query';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BaseAxios } from 'shared/axios';
import { useNavigate } from 'react-router-dom';

const theme = createTheme();

export const Login = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isLoading, mutateAsync } = useMutation(
    ({ email, password }: any) => BaseAxios.post(`auth/login`, { email, password }),
    {
      mutationKey: ['Login'],
    }
  );

  const { handleChange, handleSubmit, values } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values) => {
      const { data }: any = await mutateAsync(values);

      localStorage.setItem('token', data.token);
      queryClient.setQueryData('token', data.token);

      navigate('/');
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Container component="main">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Logowanie
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleChange}
              value={values.email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Hasło"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChange}
              value={values.password}
            />
            <Button
              disabled={isLoading}
              type="submit"
              fullWidth
              variant="outlined"
              sx={{ mt: 3, mb: 2 }}
            >
              Zaloguj
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/register" variant="body2">
                  {'Rejestracja'}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
