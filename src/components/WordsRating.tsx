import React, {FC} from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../state/store';
import cl from './WordLists.module.scss'


interface WordsRatingProps{
    usernickname: string,
    folderName: string
}


const WordsRating:FC<WordsRatingProps> = ({usernickname, folderName}) => {


    const userWordList = useSelector((state: RootState) => state.wordsList[usernickname]).folders[folderName].words;
    const newWords = Object.entries(userWordList).filter(
        ([_, info]) => info.studyingPhase === 1
        );
    const learningWords = Object.entries(userWordList).filter(
        ([_, info]) => info.studyingPhase === 2
        );
    const learnedWords = Object.entries(userWordList).filter(
        ([_, info]) => info.studyingPhase === 3
        );

  return (
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
  );
};

export default WordsRating;