import React, { FC } from 'react'
import cl from './MyButton.module.scss'
import { DeleteFolder } from '../../../state/words/WordsStorage' 
import { useDispatch} from 'react-redux';
interface MyButton_deleteFolderProps{
    folderName: string
    children: any;
}


const MyButton_deleteFolder:FC<MyButton_deleteFolderProps> = ({folderName, children}) => {
    const dispatch = useDispatch()
    function deleteFolder(e: React.MouseEvent<HTMLButtonElement>){
        e.preventDefault()
        dispatch(DeleteFolder(folderName))
    }
    return(
        <button className={cl.btn} onClick={e =>{deleteFolder(e)}}>{children}</button>
        )
}
export default MyButton_deleteFolder