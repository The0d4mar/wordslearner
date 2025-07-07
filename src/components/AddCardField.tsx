import React, { FC } from 'react';
import cl from './AddFolder.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../state/store';
import { ChangeOriginalWord, ChangeTranslateWord } from '../state/addfolder/FolderAdder';


interface AddCardFieldProps {
    pairNumber: string;
}

const AddCardField: FC<AddCardFieldProps> = ({pairNumber}) => {

    const newPairStorage = useSelector((state: RootState) =>state.pairStorage);
    const localPairObject = newPairStorage.pairs[pairNumber];
    const dispatch = useDispatch();

    const changeOriginalWord = (e:React.ChangeEvent<HTMLInputElement>) =>{

        dispatch(ChangeOriginalWord(`${pairNumber};${e.target.value}`))

    }

    const changeTranslateWord = (e:React.ChangeEvent<HTMLInputElement>) =>{

        dispatch(ChangeTranslateWord(`${pairNumber};${e.target.value}`))

    }



  return (
    <div className={cl.wordField}>
      <input
        placeholder="Enter an original word"
        value={localPairObject.originalWord}
        onChange={(e) =>
          changeOriginalWord(e)
        }
      />
      <input
        placeholder="Enter translate of this word"
        value={localPairObject.wordTranslate}
        onChange={(e) =>
          changeTranslateWord(e)
        }
      />
    </div>
  );
};

export default AddCardField;