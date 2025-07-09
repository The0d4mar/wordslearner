import React, {FC, useEffect, useState} from 'react';
import cl from './AddFolder.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import { AddNewFolder, AddNewWord } from '../state/words/WordsStorage';
import MyButton, { ButtonVariants } from './UI/button/MyButton';
import AddCardField from './AddCardField';
import { useNavigate, useParams } from 'react-router-dom';
import { RootState } from '../state/store';
import { AddNewPair, CleanPairStorage } from '../state/addfolder/FolderAdder';


interface AddFolderProps{

}
interface WordPair {
  originalWord: string;
  transalteWord: string;
}


const AddFolder:FC<AddFolderProps> = () => {




    let usernickname= useParams<{ usernickname: string }>()['usernickname'];
    const [folder, setFolder] = useState<string>('');
    const newPairStorage = useSelector((state: RootState) => state.pairStorage);
    const keyarray = Object.keys(newPairStorage);
    const dispatch = useDispatch();
    const router = useNavigate()

    function addNewPair(e:React.MouseEvent<HTMLButtonElement>){
        e.preventDefault()
        const lastKey = keyarray.length > 0 ? parseInt(keyarray.at(-1)!) : 0;
        const newKey = lastKey + 1;
        dispatch(AddNewPair(newKey.toString()))
    }




    const AddFolderFunc = (e:React.MouseEvent<HTMLButtonElement>) =>{
        try{
            e.preventDefault();
            if(folder == '' || folder.length < 1){
                throw new Error('не указано имя папки')
            }
            dispatch(AddNewFolder(`${usernickname};${folder}`));

            for(let pair in newPairStorage){

                let newWordstr = `${usernickname};${folder};${newPairStorage[pair].originalWord};${newPairStorage[pair].wordTranslate}`;
                dispatch(AddNewWord(newWordstr));
                
            }

            dispatch(CleanPairStorage())
            router(`/folder`)
        } catch(e){
            alert(e)
        }

    }

  return (
    <div className={cl.addFolderPage}>
        <form>
            <div className={cl.folderField}>
                <input
                    placeholder='Enter a name of new folder'
                    value={folder}
                    onChange={e => setFolder(e.target.value)}
                />
            </div>

            <div className={cl.wordsField} key={1}>
                  
                  {keyarray.map((pairNumber) =>
                    <AddCardField pairNumber = {pairNumber}/>
                
                    )}


                <MyButton type={ButtonVariants.add} children={'Добавить карточку'} onClick={e => {addNewPair(e)}}/>
            </div>


            <MyButton type={ButtonVariants.simple} children={'Добавить папку'} onClick={e =>{AddFolderFunc(e)}}/>
        </form>
    </div>
  );
};

export default AddFolder;