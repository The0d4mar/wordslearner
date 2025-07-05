import React, {FC, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../state/store';
import { useParams } from 'react-router-dom';
import cl from './WordLists.module.scss'





const WordLists:FC = () => {
    let { folder: folderName } = useParams<{ folder: string }>();
    if (!folderName) {
        folderName = 'folder1'
    }
    const userWordList = useSelector((state: RootState) => state.wordsList)[folderName];
    const keyList = Object.keys(userWordList)
    const [choosenLang, setChoosenLang] = useState<string>('ru-en');
    const [wordInfo, setWordInfo] = useState({actualLength: keyList.length, actualPoz: 0})
    const [actualWord, setActualWord] = useState<string>(keyList[wordInfo.actualPoz])
    
    const nextWordFunc = (e: React.MouseEvent<HTMLButtonElement>) =>{
        let nextPoz = 0;
        if(wordInfo.actualPoz < wordInfo.actualLength){
            nextPoz= wordInfo.actualPoz + 1;
        }

        setWordInfo({...wordInfo, actualPoz:nextPoz})
        setActualWord(keyList[wordInfo.actualPoz]);
    }

    const prevWordFunc = (e: React.MouseEvent<HTMLButtonElement>) =>{
        let nextPoz = wordInfo.actualLength;
        if(wordInfo.actualPoz > wordInfo.actualLength){
            nextPoz= wordInfo.actualPoz - 1;
        }
        setWordInfo({...wordInfo, actualPoz:nextPoz})
        setActualWord(keyList[wordInfo.actualPoz]);
    }
  return (

    <div>
        <div className={cl.wordList__header}>

            <a href='/' className={cl.wordList__backBtn}>Back</a>

            <h1 className={cl.wordsList__title}>{folderName}</h1>
            
        </div>
        <div className={cl.wordListBody}>
            <div className={cl.wordCard}>
                    {actualWord}
            </div>

            <div className={cl.wordListBody__info}>
                <button onClick={e => prevWordFunc(e)}>{`<`}</button>
                {wordInfo.actualPoz}
                <button onClick={e => nextWordFunc(e)}>{`>`}</button>
            </div>
        </div>
    </div>

  );
};

export default WordLists;