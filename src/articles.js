import React from 'react';

const AnimalCard =({id, age, name, gender, photos}) =>{
    return (
    <a href={id}>
      <article className='animalCard'>
        <figure>
          <img src={photos[0]}/>
        </figure>
        <h3>{name}</h3>
        <div>
          <h4>{age} años</h4>
        </div>
        <div>
          <span className='animalGender'>
            {gender}
          </span>
        </div>
      </article>
    </a>
    )
    }
 export default AnimalCard;