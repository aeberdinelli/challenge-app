import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Grid';

interface EmptyStateComponentProps {
    mode: 'message'|'skeleton';
}

export const EmptyStateComponent = (props: EmptyStateComponentProps) => {
    if (props.mode === 'message') {
        return (
            <Alert severity="error" sx={{ mt: 3 }}>
                <AlertTitle>No restaurants found</AlertTitle>
                Try using different search terms, or removing some filters
            </Alert>
        );
    }

    return (
        <Grid mt={2} container>
            {new Array(6).fill('').map((item, index) => {
                return (
                    <Grid container direction="column" mb={5} key={`skeleton-${index}`}>
                        <Grid item mb={2}>
                            <Skeleton animation="wave" variant="rectangular" width={650} height={30} />
                        </Grid>
                        <Grid item mb={1}>
                            <Skeleton animation="wave" variant="rectangular" width={160} height={25} />
                        </Grid>
                        <Grid item>
                            <Skeleton animation="wave" variant="rectangular" width={200} height={20} />
                        </Grid>
                    </Grid>
                );
            })};
        </Grid>
    );
}