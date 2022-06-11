import React from 'react';
import { Link } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';



const AnimalCard =({id, age, name, gender, photos, handleFavorite}) =>{
  let genderImg = `/assets/${gender}_black_24dp.svg`;
  let authToken = sessionStorage.getItem('Auth Token');
  
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
    { authToken ? <button className='favorite' onClick={() => handleFavorite(id)}><FavoriteBorderIcon/></button> : null}
    </section>
    )
    }
 export default AnimalCard;