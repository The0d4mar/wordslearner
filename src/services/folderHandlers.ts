import {
  AddNewFolder,
  DeleteFolder,
  SetFolderData,
  AddNewWord,
  ChangeStudyingPhase,
  ChangeNumofstud,
  ChangeNumofsucc,
  ChangePublicFlag
} from '../state/words/WordsStorage';
import {
  AddFolderToGlobalStorage,
  DeleteFolderFromGlobalStorage
} from '../state/publicFolders/PublicStorage';
import { AppDispatch } from '../state/store';

interface InitFlags {
  editfolderFlag: boolean;
  oldfoldername: string;
  uniqeCodeState: string;
}

interface WordInfo {
  originalWord: string;
  wordTranslate: string;
  statistic: {
    studyingPhase: number;
    numofstud: number;
    numofsucc: number;
  };
}

interface WordPairs {
  [key: string]: WordInfo;
}

export const handleCreateOrUpdateFolder = (
  dispatch: AppDispatch,
  initFlags: InitFlags,
  usernickname: string,
  folder: string,
  actualData: string
): void => {
  if (initFlags.editfolderFlag) {
    dispatch(DeleteFolder({ usernickname, deleteFolder: initFlags.oldfoldername }));
  }
  dispatch(AddNewFolder({ usernickname, newFolderName: folder, uniqeCode: initFlags.uniqeCodeState }));
  dispatch(SetFolderData({ usernickname, newFolderName: folder, dateOfCreation: actualData }));
};

export const handleAddWords = (
  dispatch: AppDispatch,
  usernickname: string,
  folder: string,
  pairs: WordPairs
): void => {
  for (let pair in pairs) {
    const originalWord = pairs[pair].originalWord;
    if (!originalWord) continue;
    const wordTranslate = pairs[pair].wordTranslate;
    const stats = pairs[pair].statistic;

    dispatch(AddNewWord({ usernickname, foldername: folder, newword: originalWord, wordtranslate: wordTranslate }));
    dispatch(ChangeStudyingPhase({ usernickname, foldername: folder, targetWord: originalWord, newstudyPhase: stats.studyingPhase.toString() }));
    dispatch(ChangeNumofstud({ usernickname, foldername: folder, targetWord: originalWord, newstudyPhase: stats.numofstud.toString() }));
    dispatch(ChangeNumofsucc({ usernickname, foldername: folder, targetWord: originalWord, newstudyPhase: stats.numofsucc.toString() }));
  }
};

export const handleToggleGlobalStorage = (
  dispatch: AppDispatch,
  isPrivate: string,
  uniqeCode: string,
  folderObject: any,
  foldername: string,
  creator: string
): void => {
  if (isPrivate !== 'Папка закрыта для публичного доступа' && !uniqeCode.includes('_copy')) {
    dispatch(AddFolderToGlobalStorage({ foldername, creator, folderobject: structuredClone(folderObject) }));
  } else {
    dispatch(DeleteFolderFromGlobalStorage({ foldername, creator, folder: structuredClone(folderObject) }));
  }
};