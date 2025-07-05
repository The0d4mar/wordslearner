import React, { useState } from 'react';
import './App.css';
import MainPage from './pages/MainPage';
import WordLists from './components/WordLists';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/folder' element ={<MainPage/>}/>
        <Route path='/folder/:folder' element ={<WordLists/>}/>
        <Route path="*" element={<Navigate to="/folder" replace />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
