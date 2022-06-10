import AnimalCard from "../articles";
import { useState, useEffect } from 'react';
import { collection, query, where, deleteDoc, getFirestore, getDocs, doc } from "firebase/firestore";

const MyArticles = () => {
    const [myPets, setPets] = useState([]);
    const db = getFirestore();
    const c = collection(db, "pets")
    const querySnapshot = query(c, where("uid", "==", sessionStorage.getItem('User Id')))
    
    useEffect( () => {
        const getPets = async function(){
            const data = await getDocs(querySnapshot)
            .then( (r) => {
             setPets(r.docs.map((doc) => ({...doc.data(), id: doc.id})))
            })
            .then( () => {
                console.log(myPets);
            }).catch( (err) => {
                console.log(err);
            })
        }     
       
        getPets()
    }
    ,[])

    const handleDelete = async (id) => {
        const document = doc(db, 'pets', id);
        
        await deleteDoc(document)
        .then( () => {
            console.log("Document successfully deleted!");
            setPets(myPets.filter(pet => pet.id !== id))
        }).catch( (err) => {
            console.log(err);
        });
    }
    return (
        <div className="myarticles">
            <h1>Mis publicaciones</h1>
            <p>
                Estas son las publicaciones que has hecho en la plataforma.
            </p>
            <div className="articles">

            {myPets.map((pet) => {
                return (
                <section className='mypetscard' key={pet.id}>
                    <AnimalCard key={pet.id} {...pet}></AnimalCard>
                    <button className="delete" onClick={() => {handleDelete(pet.id)}}>Eliminar</button>
                </section>

                )
            })}

            </div>
        </div>
    );
}

export default MyArticles;