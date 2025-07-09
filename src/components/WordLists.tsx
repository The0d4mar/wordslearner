import React, {FC, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../state/store';
import { useNavigate, useParams } from 'react-router-dom';
import cl from './WordLists.module.scss'
import { Link } from 'react-router-dom';
import WordCard from './WordCard';
import MyButton, { ButtonVariants } from './UI/button/MyButton';




const WordLists:FC = () => {
    let folderWay= useParams<{ folder: string }>();
    const [folderName, usernickname] = Object.values(folderWay)[0].split('-');
    const userWordList = useSelector((state: RootState) => state.wordsList[usernickname]).folders[folderName].words;
    const keyList = Object.keys(userWordList)
    const [choosenLang, setChoosenLang] = useState<string>('ru-en');
    const [wordInfo, setWordInfo] = useState({actualLength: keyList.length, actualPoz: 1})
    const [actualWord, setActualWord] = useState<string>(keyList[wordInfo.actualPoz - 1])
    const [changeSide, setChangeSide] = useState('')
    const router = useNavigate()

    const newWords = Object.entries(userWordList).filter(
        ([_, info]) => info.studyingPhase === 1
        );
    const learningWords = Object.entries(userWordList).filter(
        ([_, info]) => info.studyingPhase === 2
        );
    const learnedWords = Object.entries(userWordList).filter(
        ([_, info]) => info.studyingPhase === 3
        );
    
    const nextWordFunc = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        let nextPoz = wordInfo.actualPoz < wordInfo.actualLength ? wordInfo.actualPoz + 1 : 1;
        setWordInfo({ ...wordInfo, actualPoz: nextPoz });
        setActualWord(keyList[nextPoz - 1]);
        setChangeSide('left')
    };

    const prevWordFunc = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        let nextPoz = wordInfo.actualPoz > 1 ? wordInfo.actualPoz - 1 : wordInfo.actualLength;
        setWordInfo({ ...wordInfo, actualPoz: nextPoz });
        setActualWord(keyList[nextPoz - 1]);
        setChangeSide('right')

    };

    const EditFolderFunc = (e:React.MouseEvent<HTMLButtonElement>) =>{


    }
  return (

    <div>
        <div className={cl.wordList__header}>

            <Link to='/folder' className={cl.wordList__backBtn}>Back</Link >

            <h1 className={cl.wordsList__title}>{folderName}</h1>
            
        </div>
        <div className={cl.wordListBody}>


            <div className={cl.wordCard}>
                <div className={cl.wordCard__container}>
                    <WordCard  originalword={actualWord} wordtranslate={userWordList[actualWord].wordtrans} side = {changeSide}/>
                </div>
            </div>



            <div className={cl.wordListBody__info}>
                <button onClick={e => prevWordFunc(e)}>{`<`}</button>
                {wordInfo.actualPoz}
                <button onClick={e => nextWordFunc(e)}>{`>`}</button>
            </div>
        </div>



        <div className={cl.wordListBody__categories}>
            <div className={cl.wordListBody__dontStartCategoria}>
                <h1 className={cl.wordListBody__categoriaHeader}>Только добавлены</h1>
                {newWords.map(([originWord, infoObj]) => (
                <div key={originWord}>
                    {originWord} — {infoObj.wordtrans}
                </div>
                ))}
            </div>

            <div className={cl.wordListBody__learnStartCategoria}>
                <h1 className={cl.wordListBody__categoriaHeader}>Изучены</h1>
                {learningWords.map(([originWord, infoObj]) => (
                <div key={originWord}>
                    {originWord} — {infoObj.wordtrans}
                </div>
                ))}
            </div>

            <div className={cl.wordListBody__learnedStartCategoria}>
                <h1 className={cl.wordListBody__categoriaHeader}>Усвоены</h1>
                {learnedWords.map(([originWord, infoObj]) => (
                <div key={originWord}>
                    {originWord} — {infoObj.wordtrans}
                </div>
                ))}
            </div>
        </div>
        <div className={cl.editFolder}>
            <MyButton children={'Edit folder'} type={ButtonVariants.simple} onClick={e=>EditFolderFunc(e)}/>
        </div>
    </div>

  );
};

export default WordLists;