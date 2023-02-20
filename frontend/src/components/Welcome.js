import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Button, Grid } from '@mui/material';

const StyledButton = styled(Button)`
    background-color: #00a594;
    color: #000;
    padding: 6px 12px;
    font-weight: 800;
    width: 60%;
    &:hover {
        background-color: #77d6cd;
    }`;

const Welcome = () => {
    return (
        <Grid container>
            <Grid item xs={6} style={{
                backgroundImage: `url(${require('../assets/images/welcome.jpg')})`, height: '100vh',
                backgroundSize: 'contain', backgroundRepeat: 'no-repeat'
            }}>
            </Grid>
            <Grid item xs={6} style={{ justifyContent: 'center', display: 'flex', alignItems: 'center' }}>
                <Box className='welcome-card'>
                    <h1 className='welcome-heading'>Welcome To Survey!</h1>
                    <StyledButton href='/survey'>Click Here To Start</StyledButton>
                </Box>
            </Grid>
        </Grid>
    );
}

export default Welcome;