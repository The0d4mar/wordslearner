import React, {FC, useState} from 'react';
import style from './NavPanel.module.scss'
import WordSearch from './WordSearch';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import MyButton, { ButtonVariants } from '../UI/button/MyButton';
import ThemeSwitcher from '../ThemeSwitcher';
import { useWindowWidth } from '../../customHooks/useWindowSize';
interface NavPanelProps{
    changeMethodOfShowing: (flag: string) => void;
    usernickname: string
}
const NavPanel:FC<NavPanelProps> = ({changeMethodOfShowing}) => {
    const MyWidth = useWindowWidth();

    const [changerViewFlag, setChangerViewFlag] = useState<string>('folders')
    const [changerBCstyles, setChangerBCstyles] = useState([style.changerBlock__background])
    const autherUserNickName = useSelector((state:RootState) => state.autherUser).currentUser

    const router = useNavigate();

    const changeChangerFlag = (e: React.MouseEvent<HTMLDivElement>) =>{
        e.stopPropagation();
        if(changerViewFlag == 'folder'){
            setChangerViewFlag('list');
            setChangerBCstyles([style.changerBlock__background, style.changerBlock__background_right])
            changeMethodOfShowing('list')
        } else{
            setChangerViewFlag('folder');
            setChangerBCstyles([style.changerBlock__background, style.changerBlock__background_left])
            changeMethodOfShowing('folder')
        }
        
    }

    const openGlobalPage = (e: React.MouseEvent<HTMLButtonElement>) =>{
        e.preventDefault();
        router(`/globalPage/:${autherUserNickName}`)

    }

  return (
        <nav className={style.navpanel}>
            {MyWidth >=1024 ? (<>
            
                    <div className={style.navpanel__leftBlock}>
                    <div className={style.ChangeViewBlock}>

                        <div className={style.changerBlock} onClick={e => changeChangerFlag(e)}>
                            <div className={changerBCstyles.join(' ')}></div>
                            <div className={style.changerBlock__container}>
                                <div className={style.changerBlock__variants}>Папки</div>
                                <div className={style.changerBlock__variants}>Список</div>
                            </div>
                        </div>

                    </div>

                    <div className={style.searchWordBlock}>
                        <WordSearch/>
                    </div>
                </div>

                <div className={style.toglobalPage}>
                    <ThemeSwitcher/>
                    <MyButton onClick={e => openGlobalPage(e)} children={'Открыть глобальную страницу'} type={ButtonVariants.simple}/>
                </div>
        
            </>):
            (<>
            
            <div className={style.navpanel__leftBlock}>
                    <div className={style.ChangeViewBlock}>

                        <div className={style.changerBlock} onClick={e => changeChangerFlag(e)}>
                            <div className={changerBCstyles.join(' ')}></div>
                            <div className={style.changerBlock__container}>
                                <div className={style.changerBlock__variants}>Папки</div>
                                <div className={style.changerBlock__variants}>Список</div>
                            </div>
                        </div>

                    </div>

                    <div className={style.searchWordBlock}>
                        <WordSearch/>
                    </div>
            </div>
            </>)
            
            }
        
        </nav>
  );
};

export default NavPanel;