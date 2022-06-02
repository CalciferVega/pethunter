import React from 'react';
import { Link } from 'react-router-dom';

const AnimalCard =({id, age, name, gender, photos}) =>{
  let genderImg = `/assets/${gender}_black_24dp.svg`;
    return (
    <Link  to={'pet/' + id} className='animalCard'>
      <article >
        <figure>
          <img src={photos !== undefined ? photos[0] : '/pets/1237-01.png'}/>
        </figure>
        <h3>{name} 
          <img className='animalGender' src={genderImg}/>
        </h3>
        <div>
          <h4>{age} años</h4>
        </div>
      </article>
    </Link>
    )
    }
 export default AnimalCard;