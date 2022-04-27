import {pets} from '../dataSet';

function Petpost(){
  let pathNav = window.location.pathname;
  let petId = pathNav.slice(5, pathNav.length);
  function filterById(jsonObject, id) {return jsonObject.filter(function(jsonObject) {return (jsonObject['id'] == id);})[0];}
  
  let myData = filterById(pets, petId)
  let genderImg = `/assets/${myData.gender}_black_24dp.svg`;
    return(
      <div className='petPost'>
        <figure>
          <img className='petPhoto' src={myData.photos[0]}/>
        </figure>
        <div className='wishlistBtn'>
          <img src=""/>
        </div>
        <section className='aboutPet'>
          <h2>{myData.name}</h2>
          <h3><img src={genderImg}/></h3>
          <h4 className='title'>Sobre mi</h4>
          <p>{myData.about}</p>
        </section>
      </div>
    )
  }

export default Petpost;