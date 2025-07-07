import React, {FC, useState} from 'react';
import cl from './AddFolder.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  AddNewFolder,
  AddNewWord,
  ChangeNumofstud,
  ChangeNumofsucc,
  ChangeStudyingPhase,
  CorrectFolderName,
  DeleteFolder,
  SetFolderData,
} from '../state/words/WordsStorage';
import MyButton, { ButtonVariants } from './UI/button/MyButton';
import AddCardField from './AddCardField';
import { useNavigate, useParams } from 'react-router-dom';
import { RootState } from '../state/store';
import { AddNewPair, CleanPairStorage } from '../state/addfolder/FolderAdder';

interface AddFolderProps {}

const AddFolder: FC<AddFolderProps> = () => {
  const usernickname = useParams<{ usernickname: string }>().usernickname!;
  const newPairStorage = useSelector((state: RootState) => state.pairStorage);
  const [folder, setFolder] = useState<string>(newPairStorage.folderName);
  const [initFlags] = useState(() => ({
    editfolderFlag: newPairStorage.folderName !== '',
    oldfoldername: newPairStorage.folderName || '',
  }));

  const keyarray = Object.keys(newPairStorage.pairs);

  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = now.getFullYear();
  let actualData = `${day}-${month}-${year}`;
  if (folder !== '' && newPairStorage.dataofcreaton !== '') {
    actualData = newPairStorage.dataofcreaton;
  }

  const dispatch = useDispatch();
  const router = useNavigate();

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

      for (let pair in newPairStorage.pairs) {
        const originalWord = newPairStorage.pairs[pair].originalWord;
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

  return (
    <div className={cl.addFolderPage}>
      <form>
        <div className={cl.folderField}>
          <input
            placeholder="Enter a name of new folder"
            value={folder}
            onChange={(e) => setFolder(e.target.value)}
          />
        </div>

        <div className={cl.wordsField}>
          {keyarray.map((pairNumber) => (
            <AddCardField key={pairNumber} pairNumber={pairNumber} />
          ))}

          <MyButton
            type={ButtonVariants.add}
            children={'Добавить карточку'}
            onClick={(e) => {
              addNewPair(e);
            }}
          />
        </div>

        <MyButton
          type={ButtonVariants.simple}
          children={'Добавить папку'}
          onClick={(e) => {
            AddFolderFunc(e);
          }}
        />
      </form>
    </div>
  );
};

export default AddFolder;