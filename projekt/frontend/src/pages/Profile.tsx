import { FC } from 'react';
import { useLogout } from 'shared/useLogout';
import { useProfileDataQuery } from 'shared/useProfileDataQuery';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { UserRole } from 'types/role';

const theme = createTheme();

export const roleMap = {
  [UserRole.OWNER]: 'OWNER',
  [UserRole.ADMIN]: 'ADMIN',
  [UserRole.USER]: 'USER',
  [UserRole.UNRECOGNIZED]: 'UNRECOGNIZED',
};

export const isOwner = (role: any) => [UserRole.OWNER].includes(role);
export const isAdmin = (role: any) => [UserRole.OWNER, UserRole.ADMIN].includes(role);

export const Profile: FC = () => {
  const logout = useLogout();
  const { data } = useProfileDataQuery();

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
          <div>
            <Button variant="outlined" onClick={logout}>
              Wyloguj
            </Button>
          </div>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
