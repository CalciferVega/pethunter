import React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { styled } from '@mui/material/styles';
import { app } from "../firebaseConfig"
import { collection, addDoc, getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";


const Input = styled('input')({
    display: 'none',
});


const AddPet = ({ }) => {
    const [data, setData] = useState({});
    const [gender, setGender] = React.useState('');
    const [city, setCity] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [fileURL, setFileUrl] = React.useState('');
    const db = getFirestore();

    const [sev, setSev] = React.useState("warning");
    const [textInfo, setText] = React.useState("texto de prueba");

    
    const handleCall = (text, sever) => {
        setSev(sever);
        setText(text);
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };


    const handleInput = (event) => {
        let newInput = { [event.target.name]: event.target.value };
        setData({ ...data, ...newInput });
    }

    const handleChange = (event) => {
        let dataName = event.target.name;
        let addData = { [event.target.name]: event.target.value };
        setData({ ...data, ...addData });

        if (dataName == 'gender') setGender(event.target.value);
        if (dataName == 'city') setCity(event.target.value);
    }

    const onFileChange = async (event) => {
        const file = event.target.files[0];
        const storageRef = ref(getStorage(), 'petPhotos/' + file.name);

        await uploadBytes(storageRef, file).then((snapshot) => {
            console.log('Uploaded a blob or file!');
        });
        await getDownloadURL(storageRef).then((url) => {
            let addData = { 'photos': [url] };
            setData({ ...data, ...addData });
            console.log(url)
        });

    }
    async function handleSubmit() {
        if (data.name == undefined || data.age == undefined) return handleCall( "Agrega el nombre y/o la edad", 'warning');
        if (data.gender == undefined || data.city == undefined || data.about == undefined) return handleCall( "Completa los campos faltantes", 'warning');
        if (data.photos == undefined) return handleCall( "Recuerda subir una foto", 'info');

        if (data.typePet == undefined) {
            let defType = { 'typePet': 'Cat' };
            setData({ ...data, ...defType });
        }

        await addDoc(collection(db, "pets"), data);
        console.log(data);
    }

    //     
    //     console.log(data.email);
    //     createUserWithEmailAndPassword(auth, String(data.email), data.password)
    //     .then((response) => {
    //         console.log(response.user);
    //     })
    //     .catch((err)=>{
    //         alert(err.message);
    //     })
    // }
    return (
        <Box sx={{ width: '100%' }}>

            <form className='formulary'>
                <Stack spacing={2}>
                    <h2>Agrega una mascota</h2>
                    <TextField name="name" inputProps={{ maxLength: 16 }} required label="Nombre de la mascota" variant="outlined" onChange={event => handleInput(event)} />
                    <TextField name="age" inputProps={{ maxLength: 2 }} required type="number" label="Edad" variant="outlined" onChange={event => handleInput(event)} />
                    <div className="foto">
                        <label htmlFor="icon-button-file">
                            <Input accept="image/*" id="icon-button-file" type="file" onChange={onFileChange} />
                            <IconButton color="primary" aria-label="upload picture" component="span">
                                <p>Sube una foto ...</p> <PhotoCamera />
                            </IconButton>
                        </label>
                    </div>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Género</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="gender"
                            name="gender"
                            value={gender}
                            label="Género"
                            onChange={handleChange}
                        >
                            <MenuItem value={'Male'}>Macho</MenuItem>
                            <MenuItem value={'Female'}>Hembra</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-ciudad">Ciudad</InputLabel>
                        <Select
                            labelId="demo-simple-select-ciudad"
                            id="demo-simple-select"
                            name="city"
                            value={city}
                            label="Ciudad"
                            onChange={handleChange}
                        >
                            <MenuItem value={'Monterrey'}>Monterrey</MenuItem>
                            <MenuItem value={'CDMX'}>Ciudad de México</MenuItem>
                            <MenuItem value={'Guadalajara'}>Guadalajara</MenuItem>
                        </Select>
                    </FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">Tipo de mascota</FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="Cat"
                        name="typePet"
                        onChange={event => handleInput(event)}
                    >
                        <FormControlLabel value="Cat" control={<Radio />} label="Gato" />
                        <FormControlLabel value="Dog" control={<Radio />} label="Perro" />
                        <FormControlLabel value="Other" control={<Radio />} label="Otro" />
                    </RadioGroup>
                    <TextField
                        id="outlined-multiline-flexible"
                        label="Acerca de"
                        multiline
                        name="about"
                        maxRows={4}
                        onChange={event => handleInput(event)}
                    />
                    <Button variant="contained" className="PetCompo" onClick={handleSubmit}>Enviar</Button>
                </Stack>
            </form>
            <Stack spacing={2} sx={{ width: '100%' }}>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity={sev || "success"} sx={{ width: '100%' }}>
                        {textInfo}
                    </Alert>
                </Snackbar>
            </Stack>
        </Box>
    )
}

export default AddPet;