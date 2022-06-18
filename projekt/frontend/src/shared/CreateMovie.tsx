import { useFormik } from 'formik';
import { useQueryClient } from 'react-query';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useCreateMovieMutation } from 'shared/useCRUDMovieMutation';

const theme = createTheme();

export const CreateMovie = () => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useCreateMovieMutation();

  const { handleChange, handleSubmit, values } = useFormik({
    initialValues: {
      name: '',
      genre: '',
    },
    onSubmit: async (values) => {
      mutate(values, {
        onSuccess: () => {
          queryClient.invalidateQueries(['movies-get']);
        },
      });
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Container component="main">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            marginBottom: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Dodaj film
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
              onChange={handleChange}
              value={values.name}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="genre"
              label="Genre"
              id="genre"
              autoComplete="current-genre"
              onChange={handleChange}
              value={values.genre}
            />
            <Button
              disabled={isLoading}
              type="submit"
              fullWidth
              variant="outlined"
              sx={{ mt: 3, mb: 2 }}
            >
              Utwórz
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
