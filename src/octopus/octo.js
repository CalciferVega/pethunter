import { collection, getDocs, getFirestore } from "firebase/firestore";
import { useState, useEffect } from 'react';
import AnimalCard from '../components/articles';

function GetAllPets() {
    const [pets, setPets] = useState([]);
    const db = getFirestore();
    const c = collection(db, "pets")
    const getPets = async function(){
    
    const data = await getDocs(c);
         setPets(
            data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    } ;

    getPets();
    return (
        <section className='petsBoard'>
            {pets.map((pet) => {
                return <AnimalCard key={pet.id} {...pet}></AnimalCard>
            })}
        </section>
    )
}

export default GetAllPets;