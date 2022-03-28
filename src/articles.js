import React from 'react';

const AnimalCard =({id, age, name, gender, photos}) =>{

    return (
    <a href={id} className='animalCard'>
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
            <img src="/assets/male_black_24dp.svg"/>
          </span>
        </div>
      </article>
    </a>
    )
    }
 export default AnimalCard;