import React, { FC, useState } from 'react';
import cl from './AddFolder.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { RootState } from '../../state/store';
import AddFolderForm from './AddFolderForm';
import MyButton, { ButtonVariants } from '../UI/button/MyButton';
import { getFormattedDate } from '../../utilities/dateUtils';
import {
  handleCreateOrUpdateFolder,
  handleAddWords,
  handleToggleGlobalStorage
} from '../../services/folderHandlers';

const AddFolder: FC = () => {
  const usernickname = useParams<{ usernickname: string }>().usernickname!;
  const newPairStorage = useSelector((state: RootState) => state.pairStorage);
  const addedFolder = useSelector((state: RootState) =>
    state.wordsList[usernickname]?.folders || {}
  );

  const dispatch = useDispatch();
  const router = useNavigate();

  const [folder, setFolder] = useState<string>(newPairStorage.folderName);
  const [isPrivate, setPrivate] = useState('Папка закрыта для публичного доступа');
  const keyarray = Object.keys(newPairStorage.pairs);

  const { actualData, hour, day, month, year } = getFormattedDate();
  const finalDate = folder !== '' && newPairStorage.dataofcreaton !== ''
    ? newPairStorage.dataofcreaton
    : actualData;

  const [initFlags, setInitFlags] = useState(() => ({
    editfolderFlag: newPairStorage.folderName !== '',
    oldfoldername: newPairStorage.folderName || '',
    uniqeCodeState: newPairStorage.uniqeCode || `${day}${month}${year}${hour}${usernickname}`,
  }));

  const togglePrivacy = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrivate(prev =>
      prev === 'Папка открыта для публичного доступа'
        ? 'Папка закрыта для публичного доступа'
        : 'Папка открыта для публичного доступа'
    );
  };

  const addNewPair = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const lastKey = keyarray.length > 0 ? parseInt(keyarray.at(-1)!) : 0;
    const newKey = lastKey + 1;
    dispatch({ type: 'addfolder/AddNewPair', payload: newKey.toString() });
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault();
      if (!folder) throw new Error('не указано имя папки');

      handleCreateOrUpdateFolder(dispatch, initFlags, usernickname, folder, finalDate);
      handleAddWords(dispatch, usernickname, folder, newPairStorage.pairs);
      handleToggleGlobalStorage(dispatch, isPrivate, initFlags.uniqeCodeState, addedFolder[folder], folder, usernickname);

      dispatch({ type: 'addfolder/CleanPairStorage' });
      router(initFlags.editfolderFlag ? `/folder/${folder}-${usernickname}` : '/folder');
    } catch (e) {
      alert(e);
    }
  };

  const turnBack = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch({ type: 'addfolder/CleanPairStorage' });
    setInitFlags({ editfolderFlag: false, oldfoldername: '', uniqeCodeState: '' });
    router(initFlags.editfolderFlag ? `/folder/${initFlags.oldfoldername}-${usernickname}` : '/folder');
  };

  return (
    <section className={cl.addFolderPage}>
      <div className={cl.addFolderPage__header}>
        <MyButton type={ButtonVariants.simple} children={'Back'} onClick={turnBack} />
      </div>

      <AddFolderForm
        folder={folder}
        setFolder={setFolder}
        isPrivate={isPrivate}
        changePrivacy={togglePrivacy}
        keyarray={keyarray}
        addNewPair={addNewPair}
        addFolder={handleSubmit}
        showPrivacyToggle={!initFlags.uniqeCodeState.includes("_copy")}
      />
    </section>
  );
};

export default AddFolder;