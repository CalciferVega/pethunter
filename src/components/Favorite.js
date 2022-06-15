import AnimalCard from "../articles";
import Navbar from "./navbar";
import { useState, useEffect } from 'react';
import { getFirestore, getDoc, doc, updateDoc } from "firebase/firestore";

const Favorite = () => {
  const [myPets, setPets] = useState([]);
  const db = getFirestore();
  const uid = sessionStorage.getItem('User Id');
  const user = doc(db, "users", uid);

  async function getFavorites() {

    await getDoc(user)
      .then((response) => {
        let favorites = response?.data()?.myFavorites;

        favorites.forEach(async (pet) => {
          await getDoc(doc(db, "pets", pet))
            .then((response) => {
              //setPets(response.docs.map((doc) => ({ ...doc.data(), id: doc.id, isFavorite: true })));

              let petData = { ...response.data(), id: response.id, isFavorite: true };
              setPets(oldArray => [...oldArray, petData]);
            });
        })

      })
  }

  async function handleFavorite(id) {
    let ref = doc(db, 'users', uid);
    let currentFavs = myPets.filter(pet => pet.id !== id);
    setPets(currentFavs);

    await getDoc(ref)
      .then((response) => {
        let favorites = response?.data()?.myFavorites;
        let newfavorites = favorites.filter(pet => pet !== id);
        updateDoc(ref, { myFavorites: newfavorites });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  useEffect(() => {
    getFavorites();
  }, [])





  return (
    <>
      <section className='petsBoard'>
        <h1>Tus Favoritos</h1>
        <div className="articles">

          {myPets.map((pet) => {
            return (
              <section className='mypetscard' key={pet.id}>
                <AnimalCard handleFavorite={handleFavorite} isFavorite={pet.isFavorite} key={pet.id} {...pet}></AnimalCard>
              </section>

            )

          })}

        </div>
      </section>
      <Navbar />
    </>
  );
}

export default Favorite;