import { FC } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useMoviesQuery } from 'shared/useMoviesQuery';
import { useProfileDataQuery } from 'shared/useProfileDataQuery';
import { Link } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import { useRateMovieMutation } from 'shared/useCRUDMovieMutation';
import { Box } from '@mui/system';
import { useQueryClient } from 'react-query';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export const MoviesList: FC = () => {
  const { data } = useMoviesQuery();
  const { data: profileData } = useProfileDataQuery();
  const { mutate } = useRateMovieMutation();

  const queryClient = useQueryClient();

  return (
    <TableContainer sx={{ marginTop: 3 }} component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell>Genre</StyledTableCell>
            <StyledTableCell>Rate</StyledTableCell>
            <StyledTableCell>Rate count</StyledTableCell>
            {profileData?.role != null && <StyledTableCell></StyledTableCell>}
            <StyledTableCell>Total ({data?.count})</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.movies?.map((row: any) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                {row.id}
              </StyledTableCell>
              <StyledTableCell>{row.name}</StyledTableCell>
              <StyledTableCell>{row.genre}</StyledTableCell>
              <StyledTableCell>{row.rate}</StyledTableCell>
              <StyledTableCell>{row.rateCount}</StyledTableCell>
              {profileData?.role != null && (
                <StyledTableCell>
                  <Box
                    component="form"
                    onSubmit={(e: any) => {
                      e.preventDefault();
                      const el = e.target.querySelector(`[name='rate']`) as any;
                      mutate(
                        { id: row.id, rate: Number(el?.value) },
                        {
                          onSuccess: () => {
                            queryClient.invalidateQueries(['movies-get']);
                          },
                        }
                      );
                    }}
                    sx={{ mt: 1 }}
                  >
                    <TextField
                      name="rate"
                      label="Rate movie"
                      type="number"
                      defaultValue={row.userRate}
                      InputProps={{ inputProps: { min: 0, max: 10 } }}
                    />
                  </Box>
                </StyledTableCell>
              )}
              <StyledTableCell>
                <Link to={`/movie/${row.id}`}>
                  <Button variant="outlined">See more</Button>
                </Link>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
