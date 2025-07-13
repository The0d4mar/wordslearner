import React, { FC } from 'react';
import cl from './AddFolder.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import { ChangeOriginalWord, ChangeTranslateWord, DeletePair } from '../../state/addfolder/FolderAdder';
import MyInput, { InputVariant } from '../UI/input/MyInput';
import MyButton, { ButtonVariants } from '../UI/button/MyButton';


interface AddCardFieldProps {
    pairNumber: string;
}

const AddCardField: FC<AddCardFieldProps> = ({pairNumber}) => {

    const newPairStorage = useSelector((state: RootState) =>state.pairStorage);
    const localPairObject = newPairStorage.pairs[pairNumber];
    const dispatch = useDispatch();

     const changeOriginalWord = (newValue: string) => {
      dispatch(ChangeOriginalWord({
        pairnumber:pairNumber,
        originalWord: newValue,
      }));
    };

    const changeTranslateWord = (newValue: string) => {
      dispatch(ChangeTranslateWord({
        pairnumber: pairNumber,
        translateWord: newValue,
      }));
    };

    const deleteCardFunc = (e: React.MouseEvent<HTMLButtonElement>) =>{
      e.preventDefault();
      dispatch(DeletePair(pairNumber))
    }



  return (
     <div className={cl.wordField}>
      <div className={cl.wordField__header}>
        <div className={cl.wordField__cont}>
          <div className={cl.wordField__numOfCard}>
            {pairNumber}
          </div>
          <div className={cl.wordField__deleteBtn}>
            <MyButton
            type={ButtonVariants.delete}
            children={'Delete card'}
            onClick={deleteCardFunc}
            />
          </div>
        </div>

      </div>
      <div className={cl.wordField__body}>
        <MyInput
          type={InputVariant.text}
          placeholder="Enter an original word"
          value={localPairObject.originalWord}
          onChange={changeOriginalWord}
        />
        <MyInput
          type={InputVariant.text}
          placeholder="Enter translate of this word"
          value={localPairObject.wordTranslate}
          onChange={changeTranslateWord}
        />

      </div>
      
    </div>
  );
};

export default AddCardField;