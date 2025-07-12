import React, { useState, useEffect } from 'react';
import '../App.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../state/store';
import { useNavigate } from 'react-router-dom';

import FolderContainer from '../components/FolderContainer';
import MyButton, { ButtonVariants } from '../components/UI/button/MyButton';
import NavPanel from '../components/NavPanel';
import { LogoutMethod } from '../state/autheredUser/AutheredUser';

function MainPage() {
  const [methodOfShowing, setMethodOfShowing] = useState<string>('folder');
  const [folder, setFolder] = useState<string>('');
  const [newWord, setNewWord] = useState({ originalWord: '', transalteWord: '' });
  const [actualFolder, setActualFolder] = useState<string>('');

  const usernickname = useSelector((state: RootState) => state.autherUser.currentUser);
  const router = useNavigate();
  const dispatch = useDispatch()

  // 🛡️ Защита страницы: редирект, если нет пользователя
  useEffect(() => {
    if (!usernickname) {
      router('/auth');
    }
  }, [usernickname, router]);

  const addFolder = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (usernickname) {
      router(`/addFolder/${usernickname}`);
    }
  };

  const changeMethodOfShowing = (flag: string) => {
    setMethodOfShowing(flag);
  };

  const logoutFunc = (e: React.MouseEvent<HTMLButtonElement>) =>{

    e.preventDefault();
    dispatch(LogoutMethod())

  }

  if (!usernickname) return null; // Пока редирект не сработал, не рендерим

  return (
    <section className="App">
      <header className="App__header">
        <div className='App__logoutBtn'>

          <MyButton type={ButtonVariants.delete} children={'Выйти'} onClick={logoutFunc}/>

        </div>
        <div className='App__headerCont'>
          <div className="App__addfolderBtn">
            <MyButton
              type={ButtonVariants.simple}
              onClick={addFolder}
              children={'Добавить папку'}
            />
          </div>

          <div className="userBlock">
            <div className="usercard">
              <div className="usercard__cont">{usernickname[0]}</div>
            </div>
          </div>
        </div>
      </header>

      <main>
        <NavPanel
          changeMethodOfShowing={changeMethodOfShowing}
          usernickname={usernickname}
        />

        <FolderContainer
          actualFolder={actualFolder}
          folderMethodFlag={methodOfShowing}
          setFolder={setFolder}
          newWord={newWord}
          setNewWord={(originalWord, transalteWord) =>
            setNewWord({ originalWord, transalteWord })
          }
          usernickname={usernickname}
        />
      </main>
    </section>
  );
}

export default MainPage;
