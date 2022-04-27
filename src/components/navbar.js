import { Link } from 'react-router-dom';
function Navbar(){
    return (
      <nav>
        <Link to="/"> 
            <img src="/assets/home.svg" />
        </Link>
        <Link to="/menu"> 
            <img src="/assets/menu.svg" />
        </Link>
        <Link to="/registro">
            <img src="/assets/profile.svg" />
        </Link>
        <Link to="/favorite">
            <img src="/assets/favorite.svg" />
        </Link>
      </nav>
    )
  }

  export default Navbar;