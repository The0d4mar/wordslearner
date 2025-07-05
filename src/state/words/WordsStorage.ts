import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WordInfo{
    wordtrans: string;
    studyingPhase: number;
    numofstud: number;
    numofsucc: number;
}

interface Word{
    [originLang: string]: WordInfo;
}

interface userWordList{
    [folderName: string]: Word;
}

const initialState: userWordList = {
    fold1:{
        'привет':{
            wordtrans: 'hello',
            studyingPhase: 1,
            numofstud: 1,
            numofsucc: 1,
        },
    },
}

export const WordsStorage = createSlice({
    name: "wordList",
    initialState,
    reducers:{
        AddNewFolder: (state, action: PayloadAction<string>) =>{
            const newFolderName = action.payload;
            state[newFolderName] = {}
        },

        AddNewWord: (state, action: PayloadAction<string>) =>{
            const [foldername, newword, wordtranslate] = action.payload.split(';');
            const newwordobj = {
                wordtrans: wordtranslate,
                studyingPhase: 1,
                numofstud: 0,
                numofsucc: 0,
            };
            state[foldername][newword] = newwordobj;

        },

        DeleteFolder: (state, action: PayloadAction<string>) =>{
            delete state[action.payload]
        },

        DeleteWordFromFolder: (state, action: PayloadAction<string>) =>{
            const [foldername, newword] = action.payload.split(';');
            delete state[foldername][newword];
        },

        CorrectFolderName : (state, action: PayloadAction<string>) =>{

            const [foldername, newFolderName] = action.payload.split(';');
            const oldFolderObj = state[foldername];
            delete state[foldername]
            state[newFolderName] = oldFolderObj;

        }
    }
})

export const {AddNewFolder, AddNewWord, DeleteFolder, DeleteWordFromFolder, CorrectFolderName} = WordsStorage.actions;

export default WordsStorage.reducer;