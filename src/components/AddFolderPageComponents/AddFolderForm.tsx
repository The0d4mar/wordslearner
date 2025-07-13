import React, { FC } from 'react';
import cl from './AddFolder.module.scss';
import MyInput, { InputVariant } from '../UI/input/MyInput';
import AddCardField from './AddCardField';
import MyButton, { ButtonVariants } from '../UI/button/MyButton';

interface AddFolderFormProps {
  folder: string;
  setFolder: (val: string) => void;
  isPrivate: string;
  changePrivacy: (e: React.ChangeEvent<HTMLInputElement>) => void;
  keyarray: string[];
  addNewPair: (e: React.MouseEvent<HTMLButtonElement>) => void;
  addFolder: (e: React.MouseEvent<HTMLButtonElement>) => void;
  showPrivacyToggle: boolean;
}

const AddFolderForm: FC<AddFolderFormProps> = ({
  folder,
  setFolder,
  isPrivate,
  changePrivacy,
  keyarray,
  addNewPair,
  addFolder,
  showPrivacyToggle
}) => (
  <form className={cl.addFolderPage__form}>
    <div className={cl.folderField}>
      <MyInput
        type={InputVariant.text}
        placeholder="Enter a name of new folder"
        value={folder}
        onChange={setFolder}
      />
    </div>

    {showPrivacyToggle && (
      <div className={cl.privateBtn}>
        <label className={`${cl.switch} ${cl.switch200}`}>
          <input type="checkbox" onChange={changePrivacy} />
          <span className={`${cl.slider} ${cl.slider200}`}></span>
        </label>
        {isPrivate}
      </div>
    )}

    <div className={cl.wordsField}>
      {keyarray.map((pairNumber) => (
        <AddCardField key={pairNumber} pairNumber={pairNumber} />
      ))}
      <div className={cl.wordField__addBtn}>
        <MyButton
          type={ButtonVariants.add}
          children={'Добавить карточку'}
          onClick={addNewPair}
        />
      </div>
    </div>

    <div className={cl.addFolderPage__submitBtn}>
      <MyButton
        type={ButtonVariants.simple}
        children={'Добавить папку'}
        onClick={addFolder}
      />
    </div>
  </form>
);

export default AddFolderForm;