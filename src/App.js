import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Header from './header';
import Home from './components/home'
import SignUpPage from './components/signup'
import { app } from "./firebaseConfig"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

function App() {
  return (
    <BrowserRouter>
      <Header></Header>

        <Routes>
          <Route exact path='registro' element={ <SignUpPage />} />
          <Route exact path="/" element={<Home/>}  />
        </Routes>

      <nav>
        <Link to="/"> 
          <a href='#' className='barOption active'>
            <img src="/assets/home.svg" />
          </a>
        </Link>
        <Link to="/menu"> 
          <a href='#' className='barOption'>
            <img src="/assets/menu.svg" />
          </a>
        </Link>
        <Link to="/registro">
          <a href='#' className='barOption'>
            <img src="/assets/profile.svg" />
          </a>
        </Link>
        <Link to="/favorite">
          <a href='#' className='barOption'>
            <img src="/assets/favorite.svg" />
          </a>
        </Link>
      </nav>
    </BrowserRouter>

  );
}

export default App;
