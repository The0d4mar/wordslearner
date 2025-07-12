import React, {FC} from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../state/store';
import cl from './FolderList.module.scss'
import PhaseBlock from './UI/phaseblock/PhaseBlock';
import { useNavigate } from 'react-router-dom';

interface FolderListProps{
    folderName: string;
    usernickname:string;
}



const FolderList:FC<FolderListProps> = ({folderName, usernickname}) => {
    const userWordList = useSelector((state: RootState) => state.wordsList[usernickname]).folders[folderName].words;
    console.log(Object.entries(userWordList))
    const router = useNavigate();

    function openFolder(e: React.MouseEvent<HTMLDivElement>){
        e.preventDefault();
        router(`/folder/${folderName}-${usernickname}`)
    }
  return (
    <section className={cl.folderList}>
        <h3>{folderName}</h3>
        <ul className={cl.folderList__ul}>
            {Object.keys(userWordList).map((originalWord) => 

                <li>

                    <div className={cl.folderList__li}>

                        <div className={cl.folderList__wordsPair}>
                            {originalWord} : {userWordList[originalWord].wordtrans}
                        </div>

                        <div className={cl.folderList__wordsPairInfo}>

                            <PhaseBlock phaseNum = {userWordList[originalWord].studyingPhase}/>

                            <div className={cl.folderList__info}>
                                Количество повторений: {userWordList[originalWord].numofstud}
                            </div>

                        </div>

                    </div>

                </li>
                
            )}


        </ul>

        <div className={cl.folderList__separtionLine}>
            <div className={cl.line}></div>
            <div className={cl.folderList__footerText} onClick={e => openFolder(e)}>Открыть папку</div>
            <div className={cl.line}></div>
        </div>
      
    </section>
  );
};

export default FolderList;