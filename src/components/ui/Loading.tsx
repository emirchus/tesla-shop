import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';


export const Loading = () => {
  return (
    <Grid container>
      <Grid
        item
        xs={12}
        height="calc(100vh - 200px)"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress />
      </Grid>
    </Grid>
  );
};
