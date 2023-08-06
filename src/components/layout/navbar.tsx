import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

export default function NavBar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Grid container direction="row" alignContent="center" alignItems="center">
                        <Grid item mr={5} ml={5}>
                            <Typography
                                variant="h6"
                                noWrap
                                component="div"
                                sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                            >
                                Challenge
                            </Typography>
                        </Grid>
                        <Grid item mr={3}>
                            <Link href="/">
                                <Typography style={{ textDecoration: 'none' }} color="white">Home</Typography>
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/search">
                                <Typography style={{ textDecoration: 'none' }} color="white">Search</Typography>
                            </Link>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </Box>
    );
}