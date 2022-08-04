import React from 'react';
import AnimalCard from '../components/articles';
import { useState, useEffect } from 'react';
import { collection,  getDocs,  getFirestore, doc, getDoc, updateDoc, setDoc } from "firebase/firestore";
import Navbar from '../components/navbar'
import Filter from '../components/Filter'
import updateFavorites from '../services/updateFavorites';

function Home() {
    const [pets2, setPets] = useState([]);
    const [fav, setFav] = useState([]);
    const db = getFirestore();
    const c = collection(db, "pets")
    let uid = sessionStorage.getItem('User Id');
    let ref = doc(db, 'users', uid);


    async function handleFavorite(id) {
        if (fav.find(pet => pet === id)) {
            let newFav = fav.filter(pet => pet !== id);
            setFav(newFav);
        } else {
            let newFav = [...fav, id];
            setFav(newFav);
        }
        updateFavorites(id);
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

        for (let i = 0; i < favorites.length; i++) {
            let index = favorites.findIndex(item => item === id);
            if (index !== -1) {
                return true;
            } else {
                return false;
            }
        }
    }

    async function getPets() {
        let savedPets = JSON.parse(sessionStorage.getItem('PETS')) || [];
        
        setPets(savedPets);
        
        await getDocs(c)
            .then((response) => {
                setPets(response.docs.map((doc) => ({ ...doc.data(), id: doc.id, isFavorite: isFavoritePet(doc.id) })));
                sessionStorage.setItem('PETS', JSON.stringify(response.docs.map((doc) => ({ ...doc.data(), id: doc.id, isFavorite: isFavoritePet(doc.id) }))));
            }).catch(error => {
                console.log(error);
            })
    }

    useEffect(() => {
        getFavoritePet();
    }, []);

    useEffect(() => {
        getPets();
    }, [fav]);

    return (
    <>
     <div className='home-post'>
        <Filter></Filter>
            <section className='petsBoard'>
                {pets2.map((pet) => {
                    return (
                        <AnimalCard handleFavorite={handleFavorite} isFavorite={pet.isFavorite} key={pet.id} {...pet}></AnimalCard>
                    )
                })}
            </section>
        </div>
        <Navbar />
        </>
    )
}

export default Home;
