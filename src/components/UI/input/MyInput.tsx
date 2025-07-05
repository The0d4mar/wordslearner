import React, { FC } from 'react'
import cl from './MyInput.module.scss'
export enum InputVariant{
    text = 'text',
}



interface MyInputProps{
    type: InputVariant;
    placeholder:string;
    onChange: (newVal:string) =>void;
    value:string;
}

const MyInput:FC<MyInputProps> = ({type, placeholder, onChange, value}) => {
return(
    <input type={type} placeholder={placeholder} value={value} onChange={e => onChange(e.target.value)} className={cl.input}/>
    )
}
export default MyInput