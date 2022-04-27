import React from 'react';
import AnimalCard from '../articles';
import {pets} from '../dataSet';

function Home(){
    return (
        <div>
            <section className='animalFilter'>
                <button className='active' dataPet="cat">Gatos</button>
                <button dataPet="dog">Perros</button>
                <button dataPet="rabbit">Conejos</button>
                <button dataPet="horse">Caballos</button>
            </section>
            <section className='petsBoard'>
                {pets.map((pet) => {
                return <AnimalCard key={pet.id} {...pet}></AnimalCard> 
                })}
            </section>
      </div>
    )
  }

  export default Home;
  