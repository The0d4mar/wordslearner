import React, {FC, useEffect} from 'react';
import cl from './GlobalPage.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../state/store';
import { CopyNewFolder } from '../state/words/WordsStorage';
import { useNavigate } from 'react-router-dom';
import FolderCard from '../components/MainPageComponents/FolderCard';
import MyButton, { ButtonVariants } from '../components/UI/button/MyButton';




interface GlobalPageProps{

}
const GlobalPage:FC<GlobalPageProps> = () => {

  const globalStorage = useSelector((state: RootState) => state.publicStorag)
  const globalKeys = Object.keys(globalStorage);
  const autherUserNickName = useSelector((state:RootState) => state.autherUser).currentUser;
  const dispatch  = useDispatch()
  const router = useNavigate();

  useEffect(() => {
    if (!autherUserNickName) {
      router('/auth');
    }
  }, [autherUserNickName, router]);

  if (!autherUserNickName) return null;

  const copyCardFunc = (creator:string, keyOfCard:string, uniqeKey: string) =>{

    dispatch(CopyNewFolder({

      nickname: autherUserNickName,
      nameofCopiedFolder: keyOfCard,
      copiedFolder: globalStorage[uniqeKey].folderBody

    }))


  }
  function turnToMainPAge(e: React.MouseEvent<HTMLButtonElement>){
    router('/folder')

  }

  return (
    <section>
      <header className={cl.globalPage__header}>
        <MyButton onClick={e => turnToMainPAge(e)} children={'Вернуться на главную'} type={ButtonVariants.delete}/>
         <h1>Папки сообщества</h1>
         
      </header>

      <main className={cl.GlobalPage__main}>

        {globalKeys.map((indef) =>

          <FolderCard

          folderName = {indef.split(':')[1]}
          numberOfFoldersEl = {Object.keys(globalStorage[indef].folderBody.words).length}
          usernickname = {indef.split(':')[0]}
          globalLocalFlag = {'global'}
          copyCardFunc={() => copyCardFunc(indef.split(':')[0], indef.split(':')[1], indef)}
          
          
          />

        )}



      </main>

      
    </section>
  );
};

export default GlobalPage;