import React, {FC, useEffect, useState} from 'react';
import cl from './WordCard.module.scss'


interface WordCardProps{
    originalword: string;
    wordtranslate:string;
    side: string;
}
const WordCard:FC<WordCardProps> = ({originalword, wordtranslate, side}) => {

    const [mainclasslist, setMainClasslist] = useState([cl.wordcard])

    const [classlist, setClasslist] = useState([cl.wordcard__cont])

    const [classWord, setClassWord] = useState([cl.wordcard__words])


    const [actualWordShown, setActualWordShown] = useState(originalword)
    const [translateWord, setTranslateWord] = useState(wordtranslate)

    function updateData(){
        setActualWordShown(originalword);
        setTranslateWord(wordtranslate)
        if(side == 'left'){
             setMainClasslist([...classlist, cl.wordcard_left])
             setTimeout(() => {setMainClasslist([cl.wordcard])}, 200)
        } else if(side == 'right'){
             setMainClasslist([...classlist, cl.wordcard_right])
             setTimeout(() => {setMainClasslist([cl.wordcard])}, 200)
        }

    }

    useEffect(()=>{
        updateData()

    }, [originalword, wordtranslate])


    function rotateCardBk(e: React.MouseEvent<HTMLDivElement>){
        e.preventDefault()
        setClasslist([...classlist, cl.wordcard__cont_rotate])
        setClassWord([...classWord, cl.wordcard__words_transform])
        setTimeout(()=>{setActualWordShown(translateWord)}, 400)
        setTranslateWord(translateWord == originalword ? wordtranslate : originalword)
        setTimeout(() => {setClasslist([cl.wordcard__cont]); setClassWord([cl.wordcard__words])}, 800)

    }

  return (
    <div className={mainclasslist.join(' ')}>

        <div className={classlist.join(' ')} onClick={ e => rotateCardBk(e)}>


        </div>
        <div className={classWord.join(' ')}>
            {actualWordShown}
        </div>
      
    </div>
  );
};

export default WordCard;