import React, { FC, useState } from 'react'
import cl from './FolderCard.module.scss'

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../state/store';
import MyButton_deleteFolder from './UI/button/MyButton_deleteFolder';
import MyButton_editFolder from './UI/button/MyButton_editFolder';
import MyInput, { InputVariant } from './UI/input/MyInput';
import MyButton__submit from './UI/button/MyButton__submit';
import { CorrectFolderName } from '../state/words/WordsStorage';
import { useNavigate } from 'react-router-dom';

interface FolderCardProps{
    folderName: string;
    numberOfFoldersEl:number;

}



const  FolderCard:FC<FolderCardProps>= ({folderName, numberOfFoldersEl}) => {
const [changeFolderName, setChangeFolderName] = useState<boolean>(false)
const [newFolderName, setNewFolderName] = useState('');
const dispatch = useDispatch();
const router = useNavigate()

const changeNewFolderName = (newName:string) =>{
    setNewFolderName(newName);
}

const changeFolderFlag = (event: React.MouseEvent<HTMLButtonElement>) =>{
    event.preventDefault()
    setChangeFolderName(!changeFolderName)
    setNewFolderName(folderName);
}

const changeFolderNameFunc = (e: React.MouseEvent<HTMLButtonElement>) =>{
    try{
        e.preventDefault()
        if(newFolderName.length < 1){
            throw new Error('Имя папки должно содержать хотя бы один символ')
        }
        dispatch(CorrectFolderName(`${folderName};${newFolderName}`))
        setNewFolderName('');
        setChangeFolderName(!changeFolderName);
    } catch(e){
        alert(e)
    }
}

const openFolder = (e: React.MouseEvent<HTMLDivElement>, folder: string) =>{
    e.preventDefault();
    e.stopPropagation();

    router(`/folder/${folder}`)
}



return(
    <div className={cl.folderCard} onClick={e => openFolder(e, folderName)}>
        <div className={cl.folderCard__header}>

            {numberOfFoldersEl} терминов | Vladimir Gornyi

        </div>

        <div className={cl.folderCard__body}>
            <div className={cl.folderCard__title}>

               {changeFolderName ?
               <div className={cl.folderCard__nameChanger}>
                <MyInput

                    type={InputVariant.text}
                    placeholder={'Введите новое название папки'}
                    onChange = {changeNewFolderName}
                    value={newFolderName}
                    
                />
                <MyButton__submit children={'Add'} onClick={changeFolderNameFunc}/>
                </div>
                 : folderName}
                
            </div>

            <div className={cl.folderCard__btnBlock}>

                <MyButton_editFolder onClick = {changeFolderFlag} children={changeFolderName ? 'Cancel' : 'Edit'}/>
                <MyButton_deleteFolder folderName={folderName} children={'x'}/>

            </div>
        </div>

    </div>
    )
}
export default FolderCard;

