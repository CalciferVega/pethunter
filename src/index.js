import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {pets} from './dataSet';
import AnimalCard from './articles';
import Header from './header';

ReactDOM.render(
  <React.StrictMode>
    <Header />
    <TypeAnimal />
    <BoardPet></BoardPet>
    <Navbar />
  </React.StrictMode>,
  document.getElementById('root')
);

function BoardPet(){
  return (
    <section className='petsBoard'>
      {pets.map((pet) => {
        return <AnimalCard key={pet.id} {...pet}></AnimalCard> 
      })}
    </section>
  )
}
function Board(){
return (
  <div className='carrusel'>
    <figure>
      <img src='/img/carrusel-1.png'></img>
    </figure>
    <figure>
      <img src='/img/carrusel-2.png'></img>
    </figure>
    <figure>
      <img src='/img/carrusel-3.png'></img>
    </figure>
    <section className='steps'>
      <span className='carrusel-step'></span>
      <span className='carrusel-step'></span>
      <span className='carrusel-step'></span>
    </section>
  </div>
)
}

function TypeAnimal(){
  return (
    <section className='animalFilter'>
      <button className='active' dataPet="cat">Gatos</button>
      <button dataPet="dog">Perros</button>
      <button dataPet="rabbit">Conejos</button>
      <button dataPet="horse">Caballos</button>
    </section>
  )
}

function Navbar(){
  return (
    <nav>
      <a href='#' className='barOption active'>
        <img src="/assets/home.svg" />
      </a>
      <a href='#' className='barOption'>
        <img src="/assets/menu.svg" />
      </a>
      <a href='#' className='barOption'>
        <img src="/assets/profile.svg" />
      </a>
      <a href='#' className='barOption'>
        <img src="/assets/favorite.svg" />
      </a>
    </nav>
  )
}

function Petpost(){
  return(
    <div className='petPost'>
      <figure>
        <img className='petPhoto'/>
      </figure>
      <div className='wishlistBtn'>
        <img src=""/>
      </div>
      <section className='aboutPet'>
        <h2>Petname</h2>
        <h3>Petdata <i className='petGender'></i></h3>
        <h4 className='title'>Sobre mi</h4>
        <p>Petprofiles</p>
      </section>
    </div>
  )
}

function ButtonSend(){
 return ( 
 <button className='primary'>
    <i className='material-icons'></i>
    Enviar mensaje
  </button>
  )
}

function ButtonAdopt(){
  return(
  <button className='primary'>
    <i className='material-icons'></i>
    Solicitar adopción
  </button>
  )
}

function PersonalData(){
  return (
    <div className='infoPersonal card'>
      <h4 className='titlePersonal'>
        Datos de cuidador
      </h4>
      <div className='holder'>
        <div className='col-6'>
          
        </div>
        <div className='col-6'>

        </div>
      </div>
    </div>
  )
}
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
