import React from 'react';
import { Link } from 'react-router-dom';

const AnimalCard =({id, age, name, gender, photos}) =>{
  let genderImg = `/assets/${gender}_black_24dp.svg`;
    return (
    <Link  to={'pet/' + id} className='animalCard'>
      <article >
        <figure>
          <img src={photos[0]}/>
        </figure>
        <h3>{name}</h3>
        <div>
          <h4>{age} años</h4>
        </div>
        <div>
          <span className='animalGender'>
            <img src={genderImg}/>
          </span>
        </div>
      </article>
    </Link>
    )
    }
 export default AnimalCard;