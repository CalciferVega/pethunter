import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const SignUpPage =({}) =>{
    return (
        <section>
            <form className='formulary'>
                <TextField id="email" label="Nombre" variant="outlined" />
                <TextField id="outlined-password-input" label="Contraseña" type="password" autoComplete="current-password" />
                <Button variant="contained">Registrate</Button>
                <hr/>
                <Button variant="outlined">Registarte con Google</Button>
                <Button variant="outlined">Registarte con Facebook</Button>
            </form>

        </section>
    )
}

export default SignUpPage;