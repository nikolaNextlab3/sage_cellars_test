//import logo from './logo.svg';
import './App.css'; //stylesheet
import Nav from './components/Nav' //navbar 
import Mint from './Mint'; //Home page

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import React, { useState } from 'react';
//bootstrap import
import "./fonts/Helvetica.ttf"
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'semantic-ui-css/semantic.min.css'
import WhitelistPage from './components/WhitelistPage';


function App() {
  const [account, setAccount] = useState([]);
  const [availableAccount, setAvailableAccount] = useState(false);
  const [loading, setLoading] = useState(null);
  const [autentification, setAutentification] = useState(null);
  const [networkError, setNetworkError] = useState(null);
  return (

    <section className='fontstyled'>
      <header>  
        <div className='advise fixed-top'>
          <span className="align-middle">This website is a demo version only. It is intended to be a Proof of Concept for physical NFTs linked to different blockchains. Please do not use this website!</span>
        </div>
      </header>
        <Router>
          <div> 
          <Nav setNetworkError={setNetworkError} networkError={networkError} autentification={autentification} account={account} setAutentification={setAutentification} setAccount={setAccount} setAvailableAccount={setAvailableAccount} setLoading={setLoading} availableAccount={availableAccount} ></Nav>    
          </div>
          
              <Routes>
                  <Route path="/" element={<Mint setNetworkError={setNetworkError} networkError={networkError} autentification={autentification} setAutentification={setAutentification} setAccount={setAccount} setAvailableAccount={setAvailableAccount} setLoading={setLoading} loading={loading} availableAccount={availableAccount} />}/>
                  <Route path="/WhitelistPage" element={<WhitelistPage></WhitelistPage>}/>
              </Routes>      
        </Router>
    </section>

  );
}

export default App;
