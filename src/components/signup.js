import React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Divider from '@mui/material/Divider';
import { app } from "../firebaseConfig"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const SignUpPage =({}) =>{
    let auth = getAuth();
    const [data, setData] = useState({});
    const handleInput = (event) => {
        let newInput = {[event.target.name] : event.target.value };
        setData({...data, ...newInput});
    }
    const handleSubmit = (event) =>{
        event.preventDefault();
        console.log(data.email);
        createUserWithEmailAndPassword(auth, String(data.email), data.password)
        .then((response) => {
            console.log(response.user);
        })
        .catch((err)=>{
            alert(err.message);
        })
    }
    return (
        <Box sx={{ width: '100%' }}>
            
            <form className='formulary'>
                <Stack spacing={2}>
                    <h2>Regístrate</h2>
                    <TextField id="email" name="email" label="Correo electrónico" variant="outlined" onChange={event => handleInput(event)}/>
                    <TextField id="outlined-password-input" name="password" label="Contraseña" type="password" onChange={event => handleInput(event)}/>
                    <Button variant="contained" className="PetCompo" onClick={event => handleSubmit(event)}>Registrate</Button>
                    <Divider light />
                    <Button variant="outlined" className="PetCompo">Registarte con Google</Button>
                    <Button variant="outlined" className="PetCompo">Registarte con Facebook</Button>
                </Stack>
            </form>

        </Box>
    )
}

export default SignUpPage;