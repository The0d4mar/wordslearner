import React, {FC, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../state/store';
import { useNavigate, useParams } from 'react-router-dom';
import cl from './WordLists.module.scss'
import { Link } from 'react-router-dom';
import WordCard from './WordCard';
import MyButton, { ButtonVariants } from './UI/button/MyButton';

import { AddNewPair, ChangeFolderName, ChangeOriginalWord, ChangePrivateFlag, ChangeStatistic, ChangeTranslateWord, ChangeUniqeCode } from '../state/addfolder/FolderAdder';
import WordsRating from './WordsRating';




const WordLists:FC = () => {
    let folderWay= useParams<{ folder: string }>();
    const [folderName, usernickname] = Object.values(folderWay)[0].split('-');
    const userWordList = useSelector((state: RootState) => state.wordsList[usernickname]).folders[folderName].words;
    const folderDataCreator = useSelector((state: RootState) => state.wordsList[usernickname]).folders[folderName].dataofcreaton
    const privateFlag = useSelector((state: RootState) => state.wordsList[usernickname]).folders[folderName].publicFlag
    const uniqeCode = useSelector((state: RootState) => state.wordsList[usernickname]).folders[folderName].uniqeCode
    const keyList = Object.keys(userWordList)
    const [wordInfo, setWordInfo] = useState({actualLength: keyList.length, actualPoz: 1})
    const [actualWord, setActualWord] = useState<string>(keyList[wordInfo.actualPoz - 1])
    const [changeSide, setChangeSide] = useState('')
    const router = useNavigate()
    const dispatch = useDispatch();
    
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
        dispatch(ChangeFolderName(folderName))
        dispatch(ChangePrivateFlag(privateFlag))
        dispatch(ChangeUniqeCode(uniqeCode))
        let pairKey = 1;
        for(let original of keyList){
            dispatch(AddNewPair(pairKey.toString()))
            const translate = userWordList[original].wordtrans;
            dispatch(ChangeStatistic({
                pairkey:pairKey.toString(),
                studyingPhase:userWordList[original].studyingPhase.toString(),
                numofstud:userWordList[original].numofstud.toString(),
                numofsucc:userWordList[original].numofsucc.toString(),
                dataofcreaton:folderDataCreator,
            })) 
            dispatch(ChangeOriginalWord({
                pairnumber:pairKey.toString(),
                originalWord:original,
            }))
            dispatch(ChangeTranslateWord({
                pairnumber:pairKey.toString(),
                translateWord:translate,
            }))
            pairKey+=1;
            router(`/addFolder/${usernickname}`)
        }


    }
  return (

    <section>
        <header className={cl.wordList__header}>

            <Link to='/folder' className={cl.wordList__backBtn}>Back</Link >

            <h1 className={cl.wordsList__title}>{folderName}</h1>
            <div>{folderDataCreator}</div>
            
        </header>
        <main>
            <div className={cl.wordListBody}>


                <div className={cl.wordCard}>
                    <div className={cl.wordCard__container}>
                        <WordCard  originalword={actualWord} wordtranslate={userWordList[actualWord].wordtrans} side = {changeSide}/>
                    </div>
                </div>



                <div className={cl.wordListBody__info}>
                    <MyButton onClick={e => prevWordFunc(e)} type={ButtonVariants.simple} children={'<'}/>
                    {wordInfo.actualPoz}
                    <MyButton onClick={e => nextWordFunc(e)} type={ButtonVariants.simple} children={'>'}/>
                </div>
            </div>



            <WordsRating usernickname={usernickname} folderName={folderName}/>
            <div className={cl.editFolder}>
                <MyButton children={'Edit folder'} type={ButtonVariants.simple} onClick={e=>EditFolderFunc(e)}/>
            </div>
        </main>
    </section>

  );
};

export default WordLists;