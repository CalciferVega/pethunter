
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

  export default Navbar;