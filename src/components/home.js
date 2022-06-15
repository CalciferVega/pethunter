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
    const [fav, setFav] = useState([]);
    const db = getFirestore();
    const c = collection(db, "pets")
    const users = collection(db, "users");
    let authToken = sessionStorage.getItem('Auth Token');
    let uid = sessionStorage.getItem('User Id');
    let ref = doc(db, 'users', uid);


    async function handleFavorite(id) {
        let ref = doc(db, 'users', uid);

        await getDoc(ref)
            .then((response) => {
                let favorites = response?.data()?.myFavorites;


                if (favorites === undefined) {
                    let firstFavorite = { myFavorites: [id] };

                    setDoc(ref, firstFavorite)

                }

                if (favorites?.find(pet => pet === id)) {

                    // Remove pet from favorites.
                    let newFavorites = favorites.filter(pet => pet !== id);
                    let newFav = fav.filter(pet => pet !== id);
                    setFav(newFav);
                    updateDoc(ref, { myFavorites: newFavorites });
                    console.log("pet removed from favorites");

                } else {
                    // Add pet to favorites.
                    let newFavorites = [...favorites, id];
                    setFav([...fav, id]);
                    updateDoc(ref, { myFavorites: newFavorites });
                }
                console.log(pets2)
            })

        console.log(`my favorite ${id}`);
    }

    async function getFavoritePet() {

        await getDoc(ref)
            .then((response) => {
                let favorites = response?.data()?.myFavorites;
                setFav(favorites);
                console.log(fav);
            }
            ).catch(error => {
                console.log(error);
            });
    }

    const isFavoritePet = (id) => {
        let favorites = fav;
        console.log(favorites);
        console.log(id);
        for (let i = 0; i < favorites.length; i++) {
            let index = favorites.findIndex(item => item == id);
            console.log(index);
            if (index !== -1) {
                console.log("pet is favorite");
                return true;
            } else {
                return false;
            }
        }
    }

    async function getPets() {
        await getDocs(c)
            .then((response) => {
                setPets(response.docs.map((doc) => ({ ...doc.data(), id: doc.id, isFavorite: isFavoritePet(doc.id) })));
                console.log(pets2);
            })


    }

    useEffect(() => {
        getFavoritePet();
    }, []);

    useEffect(() => {
        getPets();
    }, [fav]);

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
                        <AnimalCard handleFavorite={handleFavorite} isFavorite={pet.isFavorite} key={pet.id} {...pet}></AnimalCard>
                    )
                })}
            </section>
            <Navbar />
        </div>
    )
}

export default Home;
