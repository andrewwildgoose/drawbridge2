import './App.css';

import React, { useState, } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import NavBar from './components/navBar';
import Registration from './components/register'
import Login from './components/login';
import UserInfo from './components/user';
import LandingPage from './components/landing';
import Logout from './components/logout';
import { AuthProvider } from './components/authContext';
import PasswordGenerator from './components/password_generator';
import CredentialStore from './components/stored_credentials';


function App() {

  return (
    <AuthProvider>
      <Router>
        <div class="container-fluid">
          <NavBar />
          <Routes>
            <Route path='/register' element={<Registration />} />
            <Route path='/login' element={<Login />} />
            <Route path='/user' element={<UserInfo />} />
            <Route path='/logout' element={<Logout />} />
            <Route path='/' element={<LandingPage />} />
            <Route path='/password_generator' element={<PasswordGenerator />} />
            <Route path='/stored_credentials' element={<CredentialStore />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
