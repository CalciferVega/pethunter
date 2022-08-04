import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import LoginPage from './login'
import AddPet from './addPet'
import Navbar from '../components/navbar'
import MyArticles from './myarticles'
import { Button } from '@mui/material';
import { app } from "../firebaseConfig"
import { getAuth } from 'firebase/auth';
import { useEffect, useState } from 'react';

const Menu = function(){
    let auth = getAuth();
    let authToken = sessionStorage.getItem('Auth Token')

    const handleLogout = () => {
        auth.signOut().then(() => {
            sessionStorage.removeItem('Auth Token');
            window.location.assign('/iniciosesion')
        });
    }

    return(
        <Box sx={{ width: '100%' }}>
            <Stack spacing={2}>
                
                <Divider light/>
                { authToken ? <Link  to='/agregamascota' element={<AddPet/>}>
                    Agrega una mascota
                </Link> : <Link  to='/iniciosesion' element={<LoginPage/>}>
                    Iniciar sesión
                </Link> }
                { authToken ? <Link  to='/mis-publicaciones' element={<MyArticles/>}>
                    Mis publicaciones
                </Link> : null }
                { authToken ? <Button variant="contained" color="primary" onClick={handleLogout}> Cerrar sesión </Button> : null }
                

            </Stack>
            <Navbar/>
        </Box>
    )
}

export default Menu;