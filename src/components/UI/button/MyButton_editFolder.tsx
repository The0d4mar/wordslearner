import React, { FC } from 'react'
import cl from './MyButton.module.scss'


interface MyButton_editFolderProps{
    onClick: (event: React.MouseEvent<HTMLButtonElement>)=> void;
    children: string;
}


const MyButton_editFolder:FC<MyButton_editFolderProps> = ({onClick, children}) => {
    
    return(
        <button className={cl.btn} onClick={e =>{onClick(e)}}>{children}</button>
        )
}
export default MyButton_editFolder