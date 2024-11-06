import {Link as RouterLink} from 'react-router-dom';
import {Button, Typography, Container} from '@mui/material';


export default function Page404() {
    return (
        <>
            <Container>
                <Typography variant="h3" paragraph>
                    Sorry, page not found! 404
                </Typography>

                <Typography sx={{color: 'text.secondary'}}>
                    Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL? Be sure to
                    check your
                    spelling.
                </Typography>
                <br/>
                <Button to="/" size="large" variant="contained" component={RouterLink}>
                    Go to Home
                </Button>
            </Container>
        </>
    );
}
