import React, {FC} from 'react';
import MyButton, { ButtonVariants } from '../UI/button/MyButton';
import cl from './FolderCard.module.scss'

interface FolderCardBtnBlockProps{

    openFolder: (e: React.MouseEvent<HTMLButtonElement>, folderName:string) =>void;
    folderName:string;
    changeFolderFlag: (event: React.MouseEvent<HTMLButtonElement>) =>void;
    changeFolderName: boolean;
    deleteFolder: (e: React.MouseEvent<HTMLButtonElement>) => void;


}



const FolderCardBtnBlock:FC<FolderCardBtnBlockProps> = ({openFolder, changeFolderFlag, changeFolderName, deleteFolder, folderName}) => {
  return (
   <div className={cl.folderCard__btnBlock}>

        <MyButton type = {ButtonVariants.simple} onClick={e => openFolder(e, folderName)} children={'Open'}/>
        <MyButton type = {ButtonVariants.simple} onClick = {changeFolderFlag} children={changeFolderName ? 'Cancel' : 'Edit'}/>
        <MyButton type = {ButtonVariants.delete} onClick={e =>{deleteFolder(e)}} children={'Delete'}/>

    </div>
  );
};

export default FolderCardBtnBlock;