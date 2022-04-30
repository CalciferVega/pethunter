import { Link } from 'react-router-dom';
function Header(){
    return (
    <header>
        <Link to="/">
            <img src='/assets/logoapp.png'></img>
        </Link>
    </header>
    )
    }

    export default Header;