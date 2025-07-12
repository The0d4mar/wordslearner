import React, { useState } from 'react';
import './App.css';
import MainPage from './pages/MainPage';
import WordLists from './components/WordLists';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AddFolder from './components/AddFolder';
import LoginRegisterPage from './pages/LoginRegisterPage';
import { useSelector } from 'react-redux';
import { RootState } from './state/store';

function App() {
  
  const isAuthorized = useSelector((state: RootState) => state.autherUser.isAuthorized);

  if (!isAuthorized) {
    <Navigate to="/auth" replace />;
  } else {
    <Navigate to="/folder" replace />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/folder' element ={<MainPage/>}/>
        <Route path="/auth" element={<LoginRegisterPage />} />
        <Route path='/addFolder/:usernickname' element ={<AddFolder/>}/>
        <Route path='/folder/:folder-nickname' element ={<WordLists/>}/>
        <Route path="*" element={<Navigate to="/folder" replace />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
