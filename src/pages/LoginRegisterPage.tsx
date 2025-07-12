import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../state/store';
import { useNavigate } from 'react-router-dom';
import { LoginMethod } from '../state/autheredUser/AutheredUser';
import { AddNewUser } from '../state/words/WordsStorage';
import styles from './LoginRegisterPage.module.scss';

const LoginRegisterPage = () => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [loginInput, setLoginInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [usernameInput, setUsernameInput] = useState('');
  const [error, setError] = useState('');

  const users = useSelector((state: RootState) => state.wordsList);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const existingUserEntry = Object.entries(users).find(
      ([nickname, data]) =>
        data.userdata.login === loginInput || nickname === loginInput
    );

    if (mode === 'login') {
      if (!existingUserEntry) {
        setError('Пользователь не найден');
        return;
      }

      const [nickname, userData] = existingUserEntry;
      if (userData.userdata.password !== passwordInput) {
        setError('Неверный пароль');
        return;
      }

      dispatch(LoginMethod(nickname));
      navigate('/');
    } else {
      if (!usernameInput || !loginInput || !passwordInput) {
        setError('Пожалуйста, заполните все поля');
        return;
      }

      const userExists = Object.entries(users).some(
        ([nickname, data]) =>
          data.userdata.login === loginInput || nickname === usernameInput
      );

      if (userExists) {
        setError('Пользователь с таким именем или email уже существует');
        return;
      }

      dispatch(AddNewUser({ newUserNickname: usernameInput, password: passwordInput, login: loginInput }));
      dispatch(LoginMethod(usernameInput));
      navigate('/');
    }
  };

  return (
    <div className={styles.page}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2>{mode === 'login' ? 'Вход' : 'Регистрация'}</h2>

        {mode === 'register' && (
          <div className={styles.field}>
            <input
              type="text"
              placeholder="Имя пользователя"
              value={usernameInput}
              onChange={(e) => setUsernameInput(e.target.value)}
            />
          </div>
        )}

        <div className={styles.field}>
          <input
            type="text"
            placeholder="Логин или email"
            value={loginInput}
            onChange={(e) => setLoginInput(e.target.value)}
          />
        </div>

        <div className={styles.field}>
          <input
            type="password"
            placeholder="Пароль"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
          />
        </div>

        {error && <div className={styles.error}>{error}</div>}

        <button type="submit" className={styles.submit}>
          {mode === 'login' ? 'Войти' : 'Зарегистрироваться'}
        </button>

        <p className={styles.switch}>
          {mode === 'login' ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}{' '}
          <span onClick={() => {
            setMode(mode === 'login' ? 'register' : 'login');
            setError('');
          }}>
            {mode === 'login' ? 'Зарегистрироваться' : 'Войти'}
          </span>
        </p>
      </form>
    </div>
  );
};

export default LoginRegisterPage;
