import React, { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../state/store';
import { DeleteFolder, DeleteWordFromFolder, CorrectFolderName } from '../state/words/WordsStorage';
import FolderCard from './FolderCard';

interface NewWordList {
  originalWord: string;
  transalteWord: string;
}

interface FolderListProps {
  actualFolder: string;
  setFolder: (newstring: string) => void;
  newWord: NewWordList;
  setNewWord: (originalWord: string, transalteWord: string) => void;
  usernickname:string;
}

const FolderList: FC<FolderListProps> = ({ actualFolder, setFolder, newWord, setNewWord, usernickname }) => {
  const userWordList = useSelector((state: RootState) => state.wordsList[usernickname]).folders;

  return (
    <div className='userListBLock'>
     {Object.entries(userWordList).map(([folderName, folderinner]) =>
        
        <FolderCard folderName = {folderName} numberOfFoldersEl = {Object.keys(folderinner.words).length} usernickname ={usernickname}/>
        )}

    </div>
  );
};

export default FolderList;
