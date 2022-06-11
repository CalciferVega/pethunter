import AnimalCard from "../articles";
import { useState, useEffect } from 'react';
import { collection, query, where, deleteDoc, getFirestore, getDocs, getDoc, doc } from "firebase/firestore";

const Favorite = () => {
    const [myPets, setPets] = useState([]);

    const db = getFirestore();
    const c = collection(db, "pets");
    const uid = sessionStorage.getItem('User Id');
    const user = doc(db, "users", uid);

    let authToken = sessionStorage.getItem('Auth Token');
    
    
    useEffect( () => {
        async function getFavorites() {

            await getDoc(user)
                .then((response) => {
                    let favorites = response?.data()?.myFavorites;
                    favorites.forEach(async (pet) => {
                        await getDoc(doc(db, "pets", pet))
                            .then((response) => {
                                let petData = {...response.data(), id: response.data().id};
                                console.log(petData);
                                setPets(oldArray => [...oldArray, petData]);
                            });
                    })

                })
        }
    
        getFavorites();
    }
    ,[])

    const handleFavorite = async (id) => {
        console.log(id);
    }


    return (
        <div>
            <h1>Guardados</h1>
            <div className="articles">

            {myPets.map((pet) => {
                return (
                <section className='mypetscard' key={pet.id}>
                    <AnimalCard handleFavorite={handleFavorite} key={pet.id} {...pet}></AnimalCard>
                </section>
                
                )

            })}

            </div>
        </div>
    );
}

export default Favorite;