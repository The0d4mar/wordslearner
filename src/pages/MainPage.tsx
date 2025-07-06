import React, { useState } from 'react';
import '../App.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../state/store';
import { AddNewFolder, AddNewWord } from '../state/words/WordsStorage';
import FolderList from '../components/FolderList';
import MyButton, { ButtonVariants } from '../components/UI/button/MyButton';
import { Link, useNavigate } from 'react-router-dom';

function MainPage() {
  const [folder, setFolder] = useState<string>('');
  const [newWord, setNewWord] = useState({ originalWord: '', transalteWord: '' });
  const usernickname = 'vovagorn';
  const userWordList = useSelector((state: RootState) => state.wordsList[usernickname]).folders;
  const router = useNavigate()

  const userWordList__folders = Object.keys(userWordList);
  const [actualFolder, setActualFolder] = useState<string>('');

  

  const addFolder = (e: React.MouseEvent<HTMLButtonElement>) =>{
    e.preventDefault();
    e.stopPropagation();
    router(`/addFolder/${usernickname}`)
  }

  return (
    <div className='App'>

    <div className='App__header'>

    <MyButton type = {ButtonVariants.simple} onClick={e=>{addFolder(e)}} children={'Добавить папку'}/>

      <div className='userBlock'>
        <div className='usercard'>
          <div className='usercard__cont'>{usernickname[0]}</div>
        </div>
      </div>
    </div>

      <FolderList
        actualFolder={actualFolder}
        setFolder={setFolder}
        newWord={newWord}
        setNewWord={(originalWord, transalteWord) =>
          setNewWord({ originalWord, transalteWord })
        }
        usernickname={usernickname}
      />
    </div>
  );
}

export default MainPage;
