import React, {FC, useEffect, useState} from 'react';
import cl from './AddFolder.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import { AddNewFolder, AddNewWord, ChangeNumofstud, ChangeNumofsucc, ChangeStudyingPhase, CorrectFolderName, DeleteFolder, SetFolderData } from '../state/words/WordsStorage';
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
    const newPairStorage = useSelector((state: RootState) => state.pairStorage);
    const [folder, setFolder] = useState<string>(newPairStorage.folderName);
    const [initFlags] = useState(() => ({
    editfolderFlag: newPairStorage.folderName !== '',
    oldfoldername: newPairStorage.folderName || ''
    }));
    console.log(initFlags.editfolderFlag);
    const keyarray = Object.keys(newPairStorage.pairs);

    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0'); // +1, потому что месяцы с 0
    const year = now.getFullYear();

    let actualData = `${day}-${month}-${year}`;
    if(folder != '' && newPairStorage.dataofcreaton != ''){
        actualData = newPairStorage.dataofcreaton;
    }
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
            if(initFlags.editfolderFlag){
                dispatch(DeleteFolder(`${usernickname};${initFlags.oldfoldername}`))
                dispatch(AddNewFolder(`${usernickname};${folder}`));
                dispatch(SetFolderData(`${usernickname};${folder};${actualData}`))

            } else{
                dispatch(AddNewFolder(`${usernickname};${folder}`));
                dispatch(SetFolderData(`${usernickname};${folder};${actualData}`))
            }


            for(let pair in newPairStorage.pairs){

                let newWordstr = `${usernickname};${folder};${newPairStorage.pairs[pair].originalWord};${newPairStorage.pairs[pair].wordTranslate}`;
                dispatch(AddNewWord(newWordstr));
                let newWordStudy = `${usernickname};${folder};${newPairStorage.pairs[pair].originalWord};${newPairStorage.pairs[pair].statistic.studyingPhase}`
                dispatch(ChangeStudyingPhase(newWordStudy))
                newWordStudy = `${usernickname};${folder};${newPairStorage.pairs[pair].originalWord};${newPairStorage.pairs[pair].statistic.numofstud}`
                dispatch(ChangeNumofstud(newWordStudy))
                newWordStudy = `${usernickname};${folder};${newPairStorage.pairs[pair].originalWord};${newPairStorage.pairs[pair].statistic.numofsucc}`
                dispatch(ChangeNumofsucc(newWordStudy))
                
                
            }

            dispatch(CleanPairStorage())
            if(initFlags.editfolderFlag){
                router(`/folder/${folder}-${usernickname}`)
            } else {
                router(`/folder`)
            }
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

            <div className={cl.wordsField}>
                  
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