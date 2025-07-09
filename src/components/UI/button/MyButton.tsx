import React, { FC } from 'react'
import cl from './MyButton.module.scss'


export enum ButtonVariants {
    simple = 'simple',
    delete = 'delete',
    add = 'add',
    cancel = 'cancel',
}

interface MyButtonProps{
    type: ButtonVariants;
    onClick: (event: React.MouseEvent<HTMLButtonElement>)=> void;
    children: any;
}


const MyButton:FC<MyButtonProps> = ({type = 'simple', onClick, children}) => {
    
    return(
        <button 
            className={type == 'simple' ? cl.btn : type == 'delete' ? cl.btnDelete : type == 'add' ? cl.btnAdd : cl.btnCancel}
            onClick={e =>{onClick(e)}}
        >
            {children}
        </button>
        )
}
export default MyButton