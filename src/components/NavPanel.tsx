import React, {FC, useState} from 'react';
import style from './NavPanel.module.scss'
import WordSearch from './WordSearch';
interface NavPanelProps{
    changeMethodOfShowing: (flag: string) => void;
    usernickname: string
}
const NavPanel:FC<NavPanelProps> = ({changeMethodOfShowing}) => {

    const [changerViewFlag, setChangerViewFlag] = useState<string>('folders')
    const [changerBCstyles, setChangerBCstyles] = useState([style.changerBlock__background])

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

  return (
    <nav className={style.navpanel}>
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
      
    </nav>
  );
};

export default NavPanel;