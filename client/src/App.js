import './App.css';
import React, {useEffect, useState} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Photos from './components/Photos';
import UserForm from './components/UserForm';
import Login from './components/Login';
import EditPhoto from './components/EditPhoto';
import Dashboard from './components/Dashboard';


function App() {
  const [photosList, setPhotosList] = useState([]);

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Photos/>} />
          <Route path="/photos/:id" element={<EditPhoto/>} />
          <Route path="/register" element={<UserForm/>} />
          <Route path="/signin" element={<Login/>} />
          <Route path="/dashboard/:user_id" element={<Dashboard/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
