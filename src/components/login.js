import React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

const LoginPage =({}) =>{
    let auth = getAuth();
    onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log(user);
      console.log(user.email);
    } else {
      console.log('not logged in');
    }
  });
    const [data, setData] = useState({});
    const handleInput = (event) => {
        let newInput = {[event.target.name] : event.target.value };
        setData({...data, ...newInput});
    }
    const handleSubmit = (event) =>{
        event.preventDefault();
        console.log(data.email);
        signInWithEmailAndPassword(auth, String(data.email), data.password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            window.location.assign('/');
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
          });
    }
    return (
        <Box sx={{ width: '100%' }}>
            <form className='formulary'>
                <Stack spacing={2}>
                <h2>Inicio de sesión</h2>
                    <TextField id="email" name="email" label="Correo electrónico" variant="outlined" onChange={event => handleInput(event)}/>
                    <TextField id="outlined-password-input" name="password" label="Contraseña" type="password" onChange={event => handleInput(event)}/>
                    <Button variant="contained" className="PetCompo" onClick={event => handleSubmit(event)}>Registrate</Button>
                    <Divider light />
                </Stack>
            </form>

        </Box>
    )
}

export default LoginPage;