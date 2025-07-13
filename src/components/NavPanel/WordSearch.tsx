import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import MyInput, { InputVariant } from '../UI/input/MyInput';

import cl from './WordSearch.module.scss'
import { useNavigate } from 'react-router-dom';

interface SearchResult {
  folderName: string;
  originalWord: string;
  translatedWord: string;
}

interface WordInfo {
  wordtrans: string;
  studyingPhase: number;
  numofstud: number;
  numofsucc: number;
}

interface Word {
  dataofcreaton: string;
  uniqeCode: string;
  publicFlag: boolean;
  words: {
    [originLang: string]: WordInfo;
  };
}

interface FolderList {
  [folderName: string]: Word;
}

interface UserWords {
  [usernickname: string]: {
    folders: FolderList;
  };
}

const WordSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const router = useNavigate();
  const usernickname = useSelector((state: RootState) => state.autherUser.currentUser) || 'vovangorn';

  const folders = useSelector((state: RootState) => state.wordsList[usernickname]).folders;

  const results = useMemo(() => {
    if (!query.trim()) return [];

    const lowerQuery = query.toLowerCase();
    const matched: SearchResult[] = [];

    Object.entries(folders).forEach(([folderName, folderData]) => {
      Object.entries(folderData.words).forEach(([originalWord, wordInfo]) => {
        const original = originalWord.toLowerCase();
        const translation = wordInfo.wordtrans.toLowerCase();

        if (original.includes(lowerQuery) || translation.includes(lowerQuery)) {
          matched.push({
            folderName,
            originalWord,
            translatedWord: wordInfo.wordtrans,
          });
        }
      });
    });

    return matched;
  }, [query, folders]);


  const redirectToFolder = (e: React.MouseEvent<HTMLButtonElement>, foldername:string) =>{
    e.preventDefault();
    router(`/folder/${foldername}-${usernickname}`)
  }

  return (
    <div className={cl.wordsearch}>
      <div className={cl.wordsearch__field}>
        <MyInput

          type={InputVariant.text}
          placeholder={'Введите слово на русском или английском...'}
          value={query}
          onChange={setQuery}
        
        />
      </div>
      <div className={cl.wordsearch__droplist} style={{display: query == '' ? 'none' : 'block'}}>
        {query && results.length === 0 && (
          <div>Такого слова нет.</div>
        )}

        {results.map((res, index) => (
          <div key={index} className={cl.wordsearch__pair}>
            <strong> {res.folderName}:</strong> {res.originalWord} — {res.translatedWord} | <button className={cl.wordsearch__btn} onClick={e => redirectToFolder(e, res.folderName)}>Open</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WordSearch;
