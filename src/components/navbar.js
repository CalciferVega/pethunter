import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
function Navbar() {
  const [pathname, setPath] = useState('/');

  useEffect(() => {
    setPath(window.location.pathname);

  },[pathname]);

  const isActive = (location, path) => {
    if (location !== path) return;
    return 'active';
  }

  return (
    <nav>
      <Link to="/" className={`${isActive('/', pathname)}`}>
        <img src="/assets/home.svg" />
      </Link>
      <Link to="/menu" className={`${isActive('/menu', pathname)}`}>
        <img src="/assets/menu.svg" />
      </Link>
      <Link to="/registro" className={`${isActive('/registro', pathname)}`}>
        <img src="/assets/profile.svg" />
      </Link>
      <Link to="/favorite" className={`${isActive('/favorite', pathname)}`}>
        <img src="/assets/favorite.svg" />
      </Link>
    </nav>
  )
}

export default Navbar;