import React, { useEffect, useState } from 'react';
import './App.scss';
import MainPage from './pages/MainPage';
import WordLists from './components/WordPageComponents/WordLists';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AddFolder from './components/AddFolderPageComponents/AddFolder';
import LoginRegisterPage from './pages/LoginRegisterPage';
import { useSelector } from 'react-redux';
import { RootState } from './state/store';
import GlobalPage from './pages/GlobalPage';

function App() {
  
  const isAuthorized = useSelector((state: RootState) => state.autherUser.isAuthorized);

  useEffect(() => {
    const userPref = localStorage.getItem('theme');
    if (userPref === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  if (!isAuthorized) {
    <Navigate to="/auth" replace />;
  } else {
    <Navigate to="/folder" replace />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/folder' element ={<MainPage/>}/>
        <Route path='/globalPage/:usernickname' element ={<GlobalPage/>}/>
        <Route path="/auth" element={<LoginRegisterPage />} />
        <Route path='/addFolder/:usernickname' element ={<AddFolder/>}/>
        <Route path='/folder/:folder-nickname' element ={<WordLists/>}/>
        <Route path="*" element={<Navigate to="/folder" replace />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
