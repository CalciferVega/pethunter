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

export default Petpost;