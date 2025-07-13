import React, { FC } from 'react';
import {useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import FolderCard from './FolderCard';
import FolderList from './FolderList';

interface NewWordList {
  originalWord: string;
  transalteWord: string;
}

interface FolderContainerProps {
  actualFolder: string;
  setFolder: (newstring: string) => void;
  newWord: NewWordList;
  setNewWord: (originalWord: string, transalteWord: string) => void;
  usernickname:string;
  folderMethodFlag:string;
}

const FolderContainer: FC<FolderContainerProps> = ({ actualFolder, setFolder, newWord, setNewWord, usernickname, folderMethodFlag }) => {
  const userWordList = useSelector((state: RootState) => state.wordsList[usernickname]).folders;

  return (
    <section className='userListBLock'>
      {folderMethodFlag == 'folder' ?

        Object.entries(userWordList).map(([folderName, folderinner]) =>
          <FolderCard folderName = {folderName} numberOfFoldersEl = {Object.keys(folderinner.words).length} usernickname ={usernickname}/>
        )
      
      : 
      Object.entries(userWordList).map(([folderName, folderinner]) =>
          <FolderList folderName = {folderName} usernickname ={usernickname}/>
        )
        }

    </section>
  );
};

export default FolderContainer;
