import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../state/store';
import { useNavigate } from 'react-router-dom';
import { LoginMethod } from '../state/autheredUser/AutheredUser';
import { AddNewUser } from '../state/words/WordsStorage';
import styles from './LoginRegisterPage.module.scss';
import MyInput, { InputVariant } from '../components/UI/input/MyInput';

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
    <div className={styles['auth-page']}>
      <div className={styles['auth-page__container']}>
        <form onSubmit={handleSubmit} className={styles['auth-page__form']}>
          <h2 className={styles['auth-page__title']}>
            {mode === 'login' ? 'Вход' : 'Регистрация'}
          </h2>

          {mode === 'register' && (
            <div className={styles['auth-page__field']}>
              <input
                className={styles['auth-page__input']}
                type="text"
                placeholder="Имя пользователя"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
              />
            </div>
          )}

          <div className={styles['auth-page__field']}>
            <MyInput
              type={InputVariant.text}
              placeholder="Логин или email"
              value={loginInput}
              onChange={setLoginInput}
            />
          </div>

          <div className={styles['auth-page__field']}>
            <MyInput
              type={InputVariant.password}
              placeholder="Пароль"
              value={passwordInput}
              onChange={setPasswordInput}
            />
          </div>

          {error && <div className={styles['auth-page__error']}>{error}</div>}

          <button type="submit" className={styles['auth-page__submit']}>
            {mode === 'login' ? 'Войти' : 'Зарегистрироваться'}
          </button>

          <p className={styles['auth-page__switch']}>
            {mode === 'login' ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}{' '}
            <span
              className={styles['auth-page__link']}
              onClick={() => {
                setMode(mode === 'login' ? 'register' : 'login');
                setError('');
              }}
            >
              {mode === 'login' ? 'Зарегистрироваться' : 'Войти'}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginRegisterPage;