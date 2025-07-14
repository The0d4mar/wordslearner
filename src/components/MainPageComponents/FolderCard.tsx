import React, { FC, useState } from 'react'
import cl from './FolderCard.module.scss'
import { useDispatch} from 'react-redux';
import MyInput, { InputVariant } from '../UI/input/MyInput';
import { CorrectFolderName, DeleteFolder } from '../../state/words/WordsStorage';
import { useNavigate } from 'react-router-dom';
import MyButton, { ButtonVariants } from '../UI/button/MyButton';
import FolderCardBtnBlock from './FolderCardBtnBlock';
import { useWindowWidth } from '../../customHooks/useWindowSize';

interface FolderCardProps{
    folderName: string;
    numberOfFoldersEl:number;
    usernickname:string;
    globalLocalFlag?:string;
    copyCardFunc? : () => void;
}



const  FolderCard:FC<FolderCardProps>= ({folderName, numberOfFoldersEl, usernickname, globalLocalFlag = 'local', copyCardFunc}) => {
const [changeFolderName, setChangeFolderName] = useState<boolean>(false)
const [newFolderName, setNewFolderName] = useState('');
const dispatch = useDispatch();
const router = useNavigate()
const MyWidth = useWindowWidth();


if (copyCardFunc == undefined){
    copyCardFunc = () =>{
        
    }
}

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
        dispatch(CorrectFolderName({
            usernickname: usernickname,
            foldername: folderName,
            newFolderName: newFolderName,
        }))
        setNewFolderName('')
        setChangeFolderName(!changeFolderName);
    } catch(e){
        alert(e)
    }
}

function deleteFolder(e: React.MouseEvent<HTMLButtonElement>){
    e.preventDefault()
    dispatch(DeleteFolder({
        usernickname,
        deleteFolder: folderName,
    }))
}

const openFolder = (e: React.MouseEvent<HTMLButtonElement>, folder: string) =>{
    e.preventDefault();
    e.stopPropagation();

    router(`/folder/${folder}-${usernickname}`)
}




return(
    <section className={cl.folderCard}>
        <div className={cl.folderCard__header}>

            {numberOfFoldersEl} терминов | {usernickname}

        </div>

        <div className={cl.folderCard__body}>
            <div className={cl.folderCard__title}>

               {changeFolderName ? (
                    MyWidth >= 1023 ? (
                        <div className={cl.folderCard__nameChanger}>
                        <MyInput
                            type={InputVariant.text}
                            placeholder={'Введите новое название папки'}
                            onChange={changeNewFolderName}
                            value={newFolderName}
                        />
                        <MyButton type={ButtonVariants.add} children={'Add'} onClick={changeFolderNameFunc} />
                        </div>
                    ) : (

                        <div className={cl.folderCard__nameChanger_mobile}>
                            <input
                                type={InputVariant.text}
                                placeholder={'Введите новое название папки'}
                                onChange={e =>changeNewFolderName(e.target.value)}
                                value={newFolderName}
                                className={cl.folderCard__nameChangerInput}
                            />
                            <button onClick={e=>changeFolderNameFunc(e)} className={cl.folderCard__nameChangerBtn}>Add</button>
                        </div>
                    )
                    ) : (
                    folderName
                )}

                
            </div>
            {globalLocalFlag == 'local' ?
            
                <FolderCardBtnBlock
            
                openFolder ={openFolder}
                folderName = {folderName}
                changeFolderFlag = {changeFolderFlag}
                changeFolderName = {changeFolderName}
                deleteFolder = {deleteFolder}
            
                />

                :
                <MyButton onClick={copyCardFunc} children={'Копировать папку'} type={ButtonVariants.add}/>
        
        
            }

        </div>

    </section>
    )
}
export default FolderCard;

