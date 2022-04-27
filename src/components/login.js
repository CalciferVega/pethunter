import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const LoginPage =({}) =>{
    return (
        <Box sx={{ width: '100%' }}>
            <form className='formulary'>
                <Stack spacing={2}>
                    <TextField id="email" label="Nombre" variant="outlined" />
                    <TextField id="outlined-password-input" label="Contraseña" type="password" autoComplete="current-password" />
                    <Button variant="contained">Registrate</Button>
                    <hr/>
                    <Button variant="outlined">Registarte con Google</Button>
                    <Button variant="outlined">Registarte con Facebook</Button>
                </Stack>
            </form>

        </Box>
    )
}

export default LoginPage;