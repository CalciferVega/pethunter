import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Header from './header';
import Home from './components/home'
import Navbar from './components/navbar'
import SignUpPage from './components/signup'
import { app } from "./firebaseConfig"

function App() {
  return (
    <BrowserRouter>
      <Header></Header>

        <Routes>
          <Route exact path='registro' element={ <SignUpPage />} />
          <Route exact path="/" element={<Home/>}  />
        </Routes>
        <Navbar/>
      
    </BrowserRouter>

  );
}

export default App;
