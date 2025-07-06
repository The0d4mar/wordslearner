import React, { FC, useState } from 'react'
import cl from './FolderCard.module.scss'
import { useDispatch} from 'react-redux';
import MyInput, { InputVariant } from './UI/input/MyInput';
import { CorrectFolderName, DeleteFolder } from '../state/words/WordsStorage';
import { useNavigate } from 'react-router-dom';
import MyButton, { ButtonVariants } from './UI/button/MyButton';

interface FolderCardProps{
    folderName: string;
    numberOfFoldersEl:number;
    usernickname:string;
}



const  FolderCard:FC<FolderCardProps>= ({folderName, numberOfFoldersEl, usernickname}) => {
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
        dispatch(CorrectFolderName(`${usernickname};${folderName};${newFolderName}`))
        setNewFolderName('');
        setChangeFolderName(!changeFolderName);
    } catch(e){
        alert(e)
    }
}

function deleteFolder(e: React.MouseEvent<HTMLButtonElement>){
    e.preventDefault()
    dispatch(DeleteFolder(`${usernickname};${folderName}`))
}


const openFolder = (e: React.MouseEvent<HTMLButtonElement>, folder: string) =>{
    e.preventDefault();
    e.stopPropagation();

    router(`/folder/${folder}-${usernickname}`)
}



return(
    <div className={cl.folderCard}>
        <div className={cl.folderCard__header}>

            {numberOfFoldersEl} терминов | {usernickname}

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
                <MyButton type = {ButtonVariants.add} children={'Add'} onClick={changeFolderNameFunc}/>
                </div>
                 : folderName}
                
            </div>

            <div className={cl.folderCard__btnBlock}>
                <MyButton type = {ButtonVariants.simple} onClick={e => openFolder(e, folderName)} children={'Open'}/>
                <MyButton type = {ButtonVariants.simple} onClick = {changeFolderFlag} children={changeFolderName ? 'Cancel' : 'Edit'}/>
                <MyButton type = {ButtonVariants.delete} onClick={e =>{deleteFolder(e)}} children={'Delete'}/>

            </div>
        </div>

    </div>
    )
}
export default FolderCard;

