import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './header';
import Home from './components/home'
import Navbar from './components/navbar'
import SignUpPage from './components/signup'
import Petpost from './components/petPost'
import Menu from './components/menu'
import AddPet from './components/addPet'
import { app } from "./firebaseConfig"
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import AdoptPage from './components/Adopt';
import MyArticles from './components/myarticles';
import LoginPage from './components/login';

function App() {
  let auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log(user);
      sessionStorage.setItem('Auth Token', user.stsTokenManager.refreshToken);
      sessionStorage.setItem('User Id', user.uid);
    } else {
      console.log('not logged in');
    }
  });

  return (
    <BrowserRouter>

      <Header></Header>
        <Routes>
          <Route path="/pet/:id" element={<Petpost/>}  />
          <Route exact path='/registro' element={ <SignUpPage />} />
          <Route exact path='/iniciosesion' element={ <LoginPage />} />
          <Route exact path='/menu' element={ <Menu />} />
          <Route exact path='/agregamascota' element={ <AddPet />} />
          <Route exact path='/mis-publicaciones' element={ <MyArticles />} />
          <Route  path='/adopt/:id' element={ <AdoptPage />} />
          <Route exact path="/" element={<Home/>}  />
        </Routes>
        

    </BrowserRouter>

  );
}

export default App;
