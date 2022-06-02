import React from 'react';
import AnimalCard from '../articles';
import { useState, useEffect } from 'react';
import { collection, query, getDocs, limitToLast, getFirestore, orderBy, doc } from "firebase/firestore";
import { async } from '@firebase/util';
import Navbar from './navbar'

function Home() {
    const [pets2, setPets] = useState([]);
    const db = getFirestore();
    const c = collection(db, "pets")

    useEffect( () => {
        const getPets = async function(){
            const data = await getDocs(c);
             setPets(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
                console.log(pets2);
        }     
       
        getPets()
    }
    ,[])
   /* const db = getFirestore();
    const q = query(collection(db, "pets"), limitToLast(50));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
    }); */

    return (
        <div>
            <section className='animalFilter'>
                <button className='active' dataPet="all">Todos</button>
                <button dataPet="cat">Gatos</button>
                <button dataPet="dog">Perros</button>
                <button dataPet="rabbit">Conejos</button>
                <button dataPet="hamster">Hamster</button>
            </section>
            <section className='petsBoard'>
            {pets2.map((pet) => {
                return <AnimalCard key={pet.id} {...pet}></AnimalCard>
            })}
            </section>
            <Navbar/>
        </div>
    )
}

export default Home;
