import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/header';
import Home from './pages/home'
import SignUpPage from './pages/signup'
import Petpost from './pages/petPost'
import Menu from './pages/menu'
import AddPet from './pages/addPet'
import { Suspense } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import AdoptPage from './pages/Adopt';
import MyArticles from './pages/myarticles';
import LoginPage from './pages/login';
import Favorite from './pages/Favorite';

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
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/pet/:id" element={<Petpost/>}  />
          <Route exact path='/registro' element={ <SignUpPage />} />
          <Route exact path='/iniciosesion' element={ <LoginPage />} />
          <Route exact path='/menu' element={ <Menu />} />
          <Route exact path='/favoritos' element={ <Favorite />} />
          <Route exact path='/agregamascota' element={ <AddPet />} />
          <Route exact path='/mis-publicaciones' element={ <MyArticles />} />
          <Route  path='/adopt/:id' element={ <AdoptPage />} />
          <Route exact path="/" element={<Home/>}  />
        </Routes>
        </Suspense>

    </BrowserRouter>

  );
}

export default App;
