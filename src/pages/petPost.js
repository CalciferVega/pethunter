import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from 'react';
import PetsIcon from '@mui/icons-material/Pets';
import { Link } from "react-router-dom";
import  AdoptPage  from './Adopt';

function Petpost() {
  let pathNav = window.location.pathname;
  let petId = pathNav.slice(5, pathNav.length);
  //function filterById(jsonObject, id) {return jsonObject.filter(function(jsonObject) {return (jsonObject['id'] == id);})[0];}

  const [pet, setPet] = useState({});
  const db = getFirestore();
  const c = doc(db, "pets", petId);
  const petData = getDoc(c);
  let authToken = sessionStorage.getItem('Auth Token');


  useEffect(() => {
    const getPet = async function () {
      const data = await getDoc(c).then(function (doc) {
        setPet({ ...doc.data() })
        console.log(pet);
      });
    }

    getPet()
    console.log(pet);
  }
    , [])
  //let myData = filterById(pets, petId)
  let genderImg = `/assets/${pet.gender}_black_24dp.svg`;
  return (
    <div className='petPost'>
      <figure>
        <img className='petPhoto' src={pet.photos !== undefined ? pet.photos[0] : '/pets/1237-01.png'} />
      </figure>
      <div className='wishlistBtn'>
        <img src="" />
      </div>
      <section className='aboutPet'>
        <h2>{pet.name}</h2>
        <div className='petCity'>
          <h3>{`${pet.city} ${pet.typePet === 'Dog' ? 'Perro' : 'Gato' }`}</h3>
        </div>
        <h3>{`${pet.age} años `}{pet.gender === 'male' ? 'Macho' : 'Hembra'}<img src={genderImg} /></h3>
        <h4 className='title'>Sobre mi</h4>
        <p>{pet.about}</p>
      </section>
      { authToken ?
        <Link to={`/adopt/${petId}`} element={<AdoptPage/>} className="btn-adopt" variant="contained" > <PetsIcon/> Quiero Adoptar </Link>
      : <Link to={`/iniciosesion`} className="btn-adopt" variant="contained" > <PetsIcon/> Quiero Adoptar </Link>}
    </div>
  )
}

export default Petpost;