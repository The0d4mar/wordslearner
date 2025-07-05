import React, { FC } from 'react'
import cl from './MyButton.module.scss'


interface MyButton__submit{
    onClick: (event: React.MouseEvent<HTMLButtonElement>)=> void;
    children: string;
}


const MyButton__submit:FC<MyButton__submit> = ({onClick, children}) => {
    
    return(
        <button className={cl.btn} onClick={e =>{onClick(e)}}>{children}</button>
        )
}
export default MyButton__submit


