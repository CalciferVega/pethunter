import React from 'react';
import { useState, useEffect } from 'react';
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
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { collection, addDoc, getFirestore } from "firebase/firestore";
import { Navigate } from 'react-router-dom';

const AdoptPage = function () {
    const pathNav = window.location.pathname;
    const petId = pathNav.slice(7, pathNav.length);
    const [data, setData] = useState({'petId': petId});
    const [gender, setGender] = React.useState('');
    const [city, setCity] = React.useState('');
    const [studyLevel, setStudy] = useState('');
    const [open, setOpen] = React.useState(false);
    const [sev, setSev] = React.useState("warning");
    const [textInfo, setText] = React.useState("texto de prueba");
    let authToken = sessionStorage.getItem('Auth Token');

    if (authToken === null) {
        window.location.assign('/');
    }


    const db = getFirestore();
    
    const handleChange = (event) => {
      let dataName = event.target.name;
      let addData = { [event.target.name]: event.target.value };
      setData({ ...data, ...addData });

      if (dataName == 'gender') setGender(event.target.value);
      if (dataName == 'city') setCity(event.target.value);
      if (dataName == 'studyLevel') setStudy(event.target.value)
  }

    const handleInput = (event) => {
        let newInput = { [event.target.name]: event.target.value };
        setData({ ...data, ...newInput });
        
    }

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

    async function handleSubmit() {
      if (data.name == undefined || data.age == undefined) return handleCall( "Agrega tu nombre y/o la edad", 'warning');
      if (data.phone == undefined || data.phone.length < 10) return handleCall( "Recuerda agregar tu teléfono completo", 'warning');
      if (data.gender == undefined || data.city == undefined || data.email == undefined) return handleCall( "Completa los campos faltantes", 'warning');
      if (data.housePetAwolled == undefined || data.houseRent == undefined || data.studyLevel == undefined) return handleCall( "Completa los campos faltantes", 'warning');
      // if (data.photos == undefined) return handleCall( "Recuerda subir una foto", 'info');

      // if (data.typePet == undefined) {
      //     let defType = { 'typePet': 'Cat' };
      //     setData({ ...data, ...defType });
      // }
      

      await addDoc(collection(db, "adoptionForms"), data)
      .then(console.log(data)) 
      .then(window.location.assign('/'))
  }
  return (
    <div className='adoptPage'>
      <h1>Adoptar</h1>
      <p>Estamos muy emocionados de poder ayudar a las mascotas, pero necesitamos tu ayuda para que puedan encontrar una nueva familia.</p>
      <p>Para poder ayudar, debes llenar el siguiente formulario, y nosotros nos encargaremos de enviarle una notificación a la persona que lo registró.</p>
      <Box sx={{ width: '100%' }}>

        <form className='formulary'>
          <section className='one'>
            <Stack spacing={2}>
            <h2>Datos Personales</h2>
              <TextField name="name" inputProps={{ maxLength: 16 }} required label="Nombre del adoptante" variant="outlined" onChange={event => handleInput(event)} />
              <TextField name="age" inputProps={{ maxLength: 2 }} required type="number" label="Edad del adoptante" variant="outlined" onChange={event => handleInput(event)} />
              <TextField name="email" inputProps={{ maxLength: 64 }} required label="Correo electrónico" variant="outlined" onChange={event => handleInput(event)} />
              <TextField name="phone" inputProps={{ maxLength: 10 }} required type="number" label="Teléfono" variant="outlined" onChange={event => handleInput(event)} />
              <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Identidad de Género</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="gender"
                name="gender"
                value={gender}
                label="Estudios"
                onChange={handleChange}
              >
                <MenuItem value={'Male'}>Hombre</MenuItem>
                <MenuItem value={'Female'}>Mujer</MenuItem>
                <MenuItem value={'NoBinary'}>No binario</MenuItem>
                <MenuItem value={'NoAswer'}>Prefiero no contestar</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Último grado de estudios:</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="studyLevel"
                name="studyLevel"
                value={studyLevel}
                label="Estudios"
                onChange={handleChange}
              >
                <MenuItem value={'Bachelor'}>Universidad</MenuItem>
                <MenuItem value={'HighSchool'}>Preparatoria</MenuItem>
                <MenuItem value={'MiddleSchool'}>Secundadia</MenuItem>
                <MenuItem value={'NoAswer'}>Prefiero no contestar</MenuItem>
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
            </Stack>
          </section>

          <section className='two'>
            <Stack spacing={2}>
            <FormLabel id="demo-radio-buttons-group-label">¿Tienes mascotas actualmente?</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="Cat"
              name="petsOwns"
              onChange={event => handleInput(event)}
            >
              <FormControlLabel value="Cat" control={<Radio />} label="Gato" />
              <FormControlLabel value="Dog" control={<Radio />} label="Perro" />
              <FormControlLabel value="Other" control={<Radio />} label="Otro" />
            </RadioGroup>
            
            
            </Stack>
          </section>
          <section className='three'>
          <Stack spacing={2}>
          <TextField
              id="outlined-multiline-flexible"
              label="¿Cuantas mascotas tienes?"
              multiline
              name="numberOfPets"
              maxRows={4}
              onChange={event => handleInput(event)}
            />
            <TextField name="houseOwner" inputProps={{ maxLength: 16 }} required label="¿Cuántas habitaciones tiene tu casa?" variant="outlined" onChange={event => handleInput(event)} />
            <TextField name="houseRent" inputProps={{ maxLength: 16 }} required label="¿Tienes casa propia o rentada?" variant="outlined" onChange={event => handleInput(event)} />
            <TextField name="housePetAwolled" inputProps={{ maxLength: 16 }} required label="¿Tienes permitido tener mascotas?" variant="outlined" onChange={event => handleInput(event)} />
            <TextField name="houseHistorial" inputProps={{ maxLength: 16 }} required label="¿Cuántas mascotas has tenido?" variant="outlined" onChange={event => handleInput(event)} />
            <TextField name="money" inputProps={{ maxLength: 16 }} required label="¿Actualmente trabajas o estudias?" variant="outlined" onChange={event => handleInput(event)} />
            <Button variant="contained" className="PetCompo" onClick={handleSubmit}>Enviar</Button>
          </Stack>
          </section>
        </form>
        <Stack spacing={2} sx={{ width: '100%' }}>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity={sev || "success"} sx={{ width: '100%' }}>
                        {textInfo}
                    </Alert>
                </Snackbar>
            </Stack>
      </Box>
    </div>
  )
}
export default AdoptPage;