import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import LoginPage from './login'
import AddPet from './addPet'
import Navbar from './navbar'

function Menu(){
    return(
        <Box sx={{ width: '100%' }}>
            <Stack spacing={2}>
                <Link  to='/iniciosesion' element={<LoginPage/>}>
                    Iniciar sesión
                </Link>
                <Divider light/>
                <Link  to='/agregamascota' element={<AddPet/>}>
                    Agrega una mascota
                </Link>
            </Stack>
            <Navbar/>
        </Box>
    )
}

export default Menu;