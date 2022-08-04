import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState } from 'react';



const AnimalCard =({id, age, name, gender, photos, handleFavorite, isFavorite}) =>{
  let genderImg = `/assets/${gender}_black_24dp.svg`;
  let authToken = sessionStorage.getItem('Auth Token');
  let [favorite, setFavorite] = useState(isFavorite);
  useEffect(() => {
    setFavorite(isFavorite)
  }, [])

    return (
      <section className='petsCard'>
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
    { authToken ? <button className='favorite' onClick={() => handleFavorite(id)}>{isFavorite === true ? <FavoriteIcon /> : <FavoriteBorderIcon/>} </button> : null}
    </section>
    )
    }
 export default AnimalCard;