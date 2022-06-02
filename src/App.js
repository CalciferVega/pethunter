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

function App() {
  return (
    <BrowserRouter>

      <Header></Header>
        <Routes>
          <Route path="/pet/:id" element={<Petpost/>}  />
          <Route exact path='/registro' element={ <SignUpPage />} />
          <Route exact path='/menu' element={ <Menu />} />
          <Route exact path='/agregamascota' element={ <AddPet />} />
          <Route exact path="/" element={<Home/>}  />
        </Routes>
        

    </BrowserRouter>

  );
}

export default App;
