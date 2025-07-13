import React, { FC, useState } from 'react'
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
    const [defaultClass] = useState([cl.defaultBtn, type == 'simple' ? cl.btnSimple : type == 'delete' ? cl.btnDelete : type == 'add' ? cl.btnAdd : cl.btnCancel])
    
    return(
        <button 
            className={defaultClass.join(' ')}
            onClick={e =>{onClick(e)}}
        >
            {children}
        </button>
        )
}
export default MyButton