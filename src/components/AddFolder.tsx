import React, {FC, useState} from 'react';
import cl from './AddFolder.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  AddNewFolder,
  AddNewWord,
  ChangeNumofstud,
  ChangeNumofsucc,
  ChangePublicFlag,
  ChangeStudyingPhase,
  ChangeUniqeCode,
  CorrectFolderName,
  DeleteFolder,
  SetFolderData,
} from '../state/words/WordsStorage';
import MyButton, { ButtonVariants } from './UI/button/MyButton';
import AddCardField from './AddCardField';
import { useNavigate, useParams } from 'react-router-dom';
import { RootState } from '../state/store';
import { AddNewPair, CleanPairStorage } from '../state/addfolder/FolderAdder';
import MyInput, { InputVariant } from './UI/input/MyInput';

interface AddFolderProps {}

const AddFolder: FC<AddFolderProps> = () => {
  const usernickname = useParams<{ usernickname: string }>().usernickname!;
  const newPairStorage = useSelector((state: RootState) => state.pairStorage);
  const [folder, setFolder] = useState<string>(newPairStorage.folderName);
  const [isPrivate, setPrivate] = useState('Папка закрыта для публичного доступа')


  const keyarray = Object.keys(newPairStorage.pairs);

  const now = new Date();
  const hour = `${String(now.getHours())}${String(now.getMinutes())}${String(now.getSeconds())}${String(now.getMilliseconds())}`
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = now.getFullYear();
  let actualData = `${day}-${month}-${year}`;
  if (folder !== '' && newPairStorage.dataofcreaton !== '') {
    actualData = newPairStorage.dataofcreaton;
  }


  const [initFlags, setInitFlags] = useState(() => ({
    editfolderFlag: newPairStorage.folderName !== '',
    oldfoldername: newPairStorage.folderName || '',
    uniqeCodeState: newPairStorage.uniqeCode || `${day}${month}${year}${hour}${usernickname}`,
  }));

  const dispatch = useDispatch();
  const router = useNavigate();


  function ChangePrivateFlagFunc(e: React.ChangeEvent<HTMLInputElement>){
    setPrivate(isPrivate == 'Папка открыта для публичного доступа' ? 'Папка закрыта для публичного доступа': 'Папка открыта для публичного доступа')
  }

  function addNewPair(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const lastKey = keyarray.length > 0 ? parseInt(keyarray.at(-1)!) : 0;
    const newKey = lastKey + 1;
    dispatch(AddNewPair(newKey.toString()));
  }

  function AddFolderFunc(e: React.MouseEvent<HTMLButtonElement>) {
    try {
      e.preventDefault();
      if (folder === '' || folder.length < 1) {
        throw new Error('не указано имя папки');
      }

      if (initFlags.editfolderFlag) {
        dispatch(
          DeleteFolder({
            usernickname: usernickname,
            deleteFolder: initFlags.oldfoldername,
          })
        );
        dispatch(
          AddNewFolder({
            usernickname: usernickname,
            newFolderName: folder,
            uniqeCode: initFlags.uniqeCodeState,
          })
        );
        dispatch(
          SetFolderData({
            usernickname: usernickname,
            newFolderName: folder,
            dateOfCreation: actualData,
          })
        );
      } else {
        dispatch(
          AddNewFolder({
            usernickname: usernickname,
            newFolderName: folder,
            uniqeCode: initFlags.uniqeCodeState,
          })
        );
        dispatch(
          SetFolderData({
            usernickname: usernickname,
            newFolderName: folder,
            dateOfCreation: actualData,
          })
        );
      }

      dispatch(ChangePublicFlag({
            usernickname: usernickname,
            foldername: folder,
            newFlag: isPrivate == 'Папка закрыта для публичного доступа' ? false : true,
      }));



      for (let pair in newPairStorage.pairs) {
        const originalWord = newPairStorage.pairs[pair].originalWord;
        if(originalWord == '' || originalWord.length < 1){
          continue
        }
        const wordTranslate = newPairStorage.pairs[pair].wordTranslate;
        const stats = newPairStorage.pairs[pair].statistic;

        dispatch(
          AddNewWord({
            usernickname: usernickname,
            foldername: folder,
            newword: originalWord,
            wordtranslate: wordTranslate,
          })
        );

        dispatch(
          ChangeStudyingPhase({
            usernickname: usernickname,
            foldername: folder,
            targetWord: originalWord,
            newstudyPhase: stats.studyingPhase.toString(),
          })
        );

        dispatch(
          ChangeNumofstud({
            usernickname: usernickname,
            foldername: folder,
            targetWord: originalWord,
            newstudyPhase: stats.numofstud.toString(),
          })
        );

        dispatch(
          ChangeNumofsucc({
            usernickname: usernickname,
            foldername: folder,
            targetWord: originalWord,
            newstudyPhase: stats.numofsucc.toString(),
          })
        );
      }

      dispatch(CleanPairStorage());
      if (initFlags.editfolderFlag) {
        router(`/folder/${folder}-${usernickname}`);
      } else {
        router(`/folder`);
      }
    } catch (e) {
      alert(e);
    }
  }

  function turnBackFunc(e: React.MouseEvent<HTMLButtonElement>){
    e.preventDefault();
    dispatch(CleanPairStorage());
    setInitFlags({
                  editfolderFlag: false,
                  oldfoldername: '',
                  uniqeCodeState: '',
                })
    if(initFlags.editfolderFlag){
       router(`/folder/${initFlags.oldfoldername}-${usernickname}`)
    } else{
      router(`/folder`)
    }
  }

  return (
    <div className={cl.addFolderPage}>
      <div className={cl.addFolderPage__header}><MyButton type={ButtonVariants.simple} children={'Back'} onClick={e=>{turnBackFunc(e)}}/></div>

      <form className={cl.addFolderPage__form}>
        <div className={cl.folderField}>
          <MyInput
            type={InputVariant.text}
            placeholder="Enter a name of new folder"
            value={folder}
            onChange={setFolder}
          />
        </div>
        <div className={cl.privateBtn}>
           <label className={`${cl.switch} ${cl.switch200}`}>
              <input type="checkbox" onChange={e =>ChangePrivateFlagFunc(e)}/>
              <span className={`${cl.slider} ${cl.slider200}`}></span>
            </label>
            {isPrivate}
        </div>

        <div className={cl.wordsField}>
          {keyarray.map((pairNumber) => (
            <AddCardField key={pairNumber} pairNumber={pairNumber} />
          ))}

          <div className={cl.wordField__addBtn}>
            <MyButton
              type={ButtonVariants.add}
              children={'Добавить карточку'}
              onClick={(e) => {
                addNewPair(e);
              }}
            />

          </div>
        </div>

        <div className={cl.addFolderPage__submitBtn}>
          <MyButton
          type={ButtonVariants.simple}
          children={'Добавить папку'}
          onClick={(e) => {
            AddFolderFunc(e);
          }}
        />
          
        </div>     
      </form>
    </div>
  );
};

export default AddFolder;