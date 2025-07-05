import React, { useState } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './state/store';
import { AddNewFolder, AddNewWord } from './state/words/WordsStorage';
import FolderList from './components/FolderList';

function App() {
  const [folder, setFolder] = useState<string>('');
  const [newWord, setNewWord] = useState({ originalWord: '', transalteWord: '' });
  const userWordList = useSelector((state: RootState) => state.wordsList);
  const dispatch = useDispatch();

  const userWordList__folders = Object.keys(userWordList);
  const [actualFolder, setActualFolder] = useState<string>('');

  function addNewFolder(e: React.MouseEvent<HTMLButtonElement>, folderName: string) {
    e.preventDefault();
    dispatch(AddNewFolder(folderName));
    setFolder('');
  }

  function addNewWord(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    try {
      if (actualFolder === '') {
        throw new Error('Не выбрана папка');
      }

      const newWordstr = `${actualFolder};${newWord.originalWord};${newWord.transalteWord}`;
      dispatch(AddNewWord(newWordstr));
      setNewWord({ originalWord: '', transalteWord: '' });
    } catch (e: any) {
      alert(e.message);
    }
  }

  return (
    <div>
      <form>
        <input
          placeholder='Enter a name of new folder'
          value={folder}
          onChange={e => setFolder(e.target.value)}
        />
        <button onClick={e => addNewFolder(e, folder)}>Add the folder</button>
      </form>

      <form>
        <select
          value={actualFolder}
          onChange={event => setActualFolder(event.target.value)}
        >
          <option value='' disabled>Выберите папку</option>
          {userWordList__folders.map(folder => (
            <option key={folder} value={folder}>{folder}</option>
          ))}
        </select>
        <input
          placeholder='Enter an original word'
          value={newWord.originalWord}
          onChange={e => setNewWord({ ...newWord, originalWord: e.target.value })}
        />
        <input
          placeholder='Enter translate of this word'
          value={newWord.transalteWord}
          onChange={e => setNewWord({ ...newWord, transalteWord: e.target.value })}
        />
        <button onClick={e => addNewWord(e)}>Add new word</button>
      </form>

      <FolderList
        actualFolder={actualFolder}
        setFolder={setFolder}
        newWord={newWord}
        setNewWord={(originalWord, transalteWord) =>
          setNewWord({ originalWord, transalteWord })
        }
      />
    </div>
  );
}

export default App;
