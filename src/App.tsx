import React, { useEffect } from 'react';
import './App.scss';
import MainPage from './pages/MainPage';
import WordLists from './components/WordPageComponents/WordLists';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AddFolder from './components/AddFolderPageComponents/AddFolder';
import LoginRegisterPage from './pages/LoginRegisterPage';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './state/store';
import GlobalPage from './pages/GlobalPage';
import Cookies from 'js-cookie';
import { LoginMethod } from './state/autheredUser/AutheredUser';

function App() {
  const dispatch = useDispatch();
  const isAuthorized = useSelector((state: RootState) => state.autherUser.isAuthorized);

  // Восстановление пользователя из cookie
  useEffect(() => {
    const savedUser = Cookies.get('user');
    if (savedUser) {
      try {
        const nickname = JSON.parse(savedUser);
        dispatch(LoginMethod(nickname));
      } catch (e) {
        console.error('Ошибка при чтении cookie пользователя:', e);
        Cookies.remove('user');
      }
    }
  }, [dispatch]);

  // Установка темы
  useEffect(() => {
    const userPref = localStorage.getItem('theme');
    const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (userPref) {
      document.documentElement.setAttribute('data-theme', userPref);
    } else {
      document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {!isAuthorized ? (
          <>
            <Route path="/auth" element={<LoginRegisterPage />} />
            <Route path="*" element={<Navigate to="/auth" replace />} />
          </>
        ) : (
          <>
            <Route path="/folder" element={<MainPage />} />
            <Route path="/addFolder/:usernickname" element={<AddFolder />} />
            <Route path="/globalPage/:usernickname" element={<GlobalPage />} />
            <Route path="/folder/:folder-nickname" element={<WordLists />} />
            <Route path="*" element={<Navigate to="/folder" replace />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
