import React, {FC, useState} from 'react';

import style from './BarButton.module.scss'
import MyButton, { ButtonVariants } from '../components/UI/button/MyButton';
import ThemeSwitcher from '../components/ThemeSwitcher';
import { useNavigate } from 'react-router-dom';

interface BarButtonProps{
    autherUserNickName:string;
    addFolder:(e: React.MouseEvent<HTMLButtonElement>) =>void;
}
const BarButton:FC<BarButtonProps> = ({autherUserNickName, addFolder}) => {


    const router = useNavigate();
    const openGlobalPage = (e: React.MouseEvent<HTMLButtonElement>) =>{
            e.preventDefault();
            router(`/globalPage/:${autherUserNickName}`)
    
        }

    const [showMenu, setShowMenu] = useState<boolean>(false)

    const changeShowMenuFlag = (e: React.MouseEvent<HTMLButtonElement>) =>{
        setShowMenu(!showMenu);
    }
  return (
    <div className={style.barMenu}>
        <button className={style.barMenu__btn} onClick={e=>changeShowMenuFlag(e)}>
            <div className={style.barMenu__image}>
                <div className={style.barMenu__bar}></div>
                <div className={style.barMenu__bar}></div>
                <div className={style.barMenu__bar}></div>
            </div>
        </button>

        <div className={style.barMenu__block} style={{display: showMenu ? 'flex' : 'none'}}>
            <div className="App__addfolderBtn">
              <MyButton
                type={ButtonVariants.simple}
                onClick={addFolder}
                children={'Add folder'}
              />
            </div>

            <ThemeSwitcher/>

            <MyButton onClick={e => openGlobalPage(e)} children={'Community'} type={ButtonVariants.simple}/>


        </div>
      
    </div>
  );
};

export default BarButton;