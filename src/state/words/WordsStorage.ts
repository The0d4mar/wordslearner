import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WordInfo{
    wordtrans: string;
    studyingPhase: number;
    numofstud: number;
    numofsucc: number;
}

interface Word{
    data: string;
    publicFlag: boolean,
    words: {
        [originLang: string]: WordInfo;
    };
}

interface UserData {
    username:string;
    password:string;
    login:string;
}

interface userWordList{
    [usernickname:string]: {
        folders: {
            [folderName: string]: Word;
        };
        userdata: UserData;
    }
}

const initialState: userWordList = {
    'vovagorn': {
        folders: {
            fold1: {
            data: '06-07-2025',
            publicFlag: false,
            words: {
                    'привет': {
                        wordtrans: 'hello',
                        studyingPhase: 1,
                        numofstud: 1,
                        numofsucc: 1,
                    },
                    'пока': {
                        wordtrans: 'goodbay',
                        studyingPhase: 3,
                        numofstud: 6,
                        numofsucc: 5,
                    },
                    'хорошо': {
                        wordtrans: 'good',
                        studyingPhase: 3,
                        numofstud: 3,
                        numofsucc: 3,
                    },
                },
            },
        },
        userdata: {
            username: 'Vladimir',
            password: '1234@passw',
            login: 'vladimir@mail.com',
        },
    }
};
export const WordsStorage = createSlice({
    name: "wordList",
    initialState,
    reducers:{
        AddNewFolder: (state, action: PayloadAction<string>) =>{
            const [usernickname, newFolderName] = action.payload.split(';');
            const dateOfCreation = `${new Date().getDate}-${new Date().getMonth}-${new Date().getFullYear}`
            state[usernickname].folders[newFolderName] = {data:dateOfCreation, words: {}, publicFlag: false}
        },

        AddNewWord: (state, action: PayloadAction<string>) =>{
            const [usernickname, foldername, newword, wordtranslate] = action.payload.split(';');
            const newwordobj = {
                wordtrans: wordtranslate,
                studyingPhase: 1,
                numofstud: 0,
                numofsucc: 0,
            };
            state[usernickname].folders[foldername].words[newword] = newwordobj;

        },

        DeleteFolder: (state, action: PayloadAction<string>) =>{
            const [usernickname, deleteFolder] = action.payload.split(';');
            delete state[usernickname].folders[deleteFolder]
        },

        DeleteWordFromFolder: (state, action: PayloadAction<string>) =>{
            const [usernickname, foldername, newword] = action.payload.split(';');
            delete state[usernickname].folders[foldername].words[newword];
        },

        CorrectFolderName : (state, action: PayloadAction<string>) =>{

            const [usernickname, foldername, newFolderName] = action.payload.split(';');
            const oldFolderObj = state[usernickname].folders[foldername];
            delete state[usernickname].folders[foldername];
            state[usernickname].folders[newFolderName] = oldFolderObj;

        }
    }
})

export const {AddNewFolder, AddNewWord, DeleteFolder, DeleteWordFromFolder, CorrectFolderName} = WordsStorage.actions;

export default WordsStorage.reducer;