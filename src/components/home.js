import React from 'react';
import AnimalCard from '../articles';
import { useState, useEffect } from 'react';
import { collection, query, where, getDocs, limitToLast, getFirestore, orderBy, doc, getDoc, updateDoc, setDoc } from "firebase/firestore";
import { async } from '@firebase/util';
import Navbar from './navbar'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

function Home() {
    const [pets2, setPets] = useState([]);
    const db = getFirestore();
    const c = collection(db, "pets")
    const users = collection(db, "users");
    let authToken = sessionStorage.getItem('Auth Token');
    let uid = sessionStorage.getItem('User Id');


    // 1. If user clicks on favorite icon, add pet to favorites.
    // 2. If user clicks on favorite border icon, remove pet from favorites.
    // 3. If user clicks on favorite border icon, add pet to favorites.


    async function handleFavorite(id){
        let ref = doc(db, 'users', uid);

        await getDoc(ref)
        .then((response) => {
            let favorites = response?.data()?.myFavorites;
            
            
            if(favorites === undefined){
                let firstFavorite = {myFavorites : [id]};

                setDoc(ref, firstFavorite)
            
            }

            if(favorites?.find(pet => pet === id)){
                
                // Remove pet from favorites.
                let newFavorites = favorites.filter(pet => pet !== id);
                updateDoc(ref, {myFavorites: newFavorites});
                console.log("pet removed from favorites");

            } else {
                // Add pet to favorites.
                let newFavorites = [...favorites, id];
                updateDoc(ref, {myFavorites: newFavorites});
            }

        })

        console.log(`my favorite ${id}`);
    }
  
    useEffect( () => {
        const getPets = async function(){
            const data = await getDocs(c);
             setPets(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
                console.log(pets2);
        }     
       
        getPets()
    }
    ,[])

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
                return (
                    <AnimalCard handleFavorite={handleFavorite} key={pet.id} {...pet}></AnimalCard>
                )
            })}
            </section>
            <Navbar/>
        </div>
    )
}

export default Home;
