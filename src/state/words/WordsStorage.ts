import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WordInfo{
    wordtrans: string;
    studyingPhase: number;
    numofstud: number;
    numofsucc: number;
}

interface Word{
    dataofcreaton: string;
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
            dataofcreaton: '06-07-2025',
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
        AddNewFolder: (state, action: PayloadAction<{usernickname: string; newFolderName: string}>) =>{
            const {usernickname, newFolderName} = action.payload;
            const dateOfCreation = '';
            state[usernickname].folders[newFolderName] = {dataofcreaton:dateOfCreation, words: {}, publicFlag: false}
        },

        SetFolderData: (state, action: PayloadAction<{usernickname:string; newFolderName:string; dateOfCreation:string}>) =>{
            const {usernickname, newFolderName, dateOfCreation} = action.payload;
            state[usernickname].folders[newFolderName].dataofcreaton = dateOfCreation;

        },

        AddNewWord: (state, action: PayloadAction<{usernickname:string; foldername:string; newword:string; wordtranslate:string;}>) =>{
            const {usernickname, foldername, newword, wordtranslate} = action.payload;
            const newwordobj = {
                wordtrans: wordtranslate,
                studyingPhase: 1,
                numofstud: 0,
                numofsucc: 0,
            };
            state[usernickname].folders[foldername].words[newword] = newwordobj;

        },

        DeleteFolder: (state, action: PayloadAction<{usernickname: string; deleteFolder: string}>) =>{
            const {usernickname, deleteFolder} = action.payload;
            delete state[usernickname].folders[deleteFolder]
        },

        DeleteWordFromFolder: (state, action: PayloadAction<{usernickname:string; foldername:string; deletedword:string}>) =>{
            const {usernickname, foldername, deletedword} = action.payload;
            delete state[usernickname].folders[foldername].words[deletedword];
        },

        CorrectFolderName : (state, action: PayloadAction<{usernickname:string; foldername:string; newFolderName:string;}>) =>{

            const {usernickname, foldername, newFolderName} = action.payload;
            const oldFolderObj = state[usernickname].folders[foldername];
            delete state[usernickname].folders[foldername];
            state[usernickname].folders[newFolderName] = oldFolderObj;

        },


        ChangeStudyingPhase: (state, action: PayloadAction<{usernickname:string; foldername:string; targetWord:string; newstudyPhase:string;}>) =>{
            const {usernickname, foldername, targetWord, newstudyPhase} = action.payload;
            state[usernickname].folders[foldername].words[targetWord].studyingPhase = +newstudyPhase;
        },

        ChangeNumofstud: (state, action: PayloadAction<{usernickname:string; foldername:string; targetWord:string; newstudyPhase:string;}>) =>{
            const {usernickname, foldername, targetWord, newstudyPhase} = action.payload;
            state[usernickname].folders[foldername].words[targetWord].numofstud = +newstudyPhase;
        },

        ChangeNumofsucc: (state, action: PayloadAction<{usernickname:string; foldername:string; targetWord:string; newstudyPhase:string;}>) =>{
            const {usernickname, foldername, targetWord, newstudyPhase} = action.payload;
            state[usernickname].folders[foldername].words[targetWord].numofsucc = +newstudyPhase;
        },

        ChangeData: (state, action: PayloadAction<{usernickname:string; foldername:string; newData:string;}>) =>{
            const {usernickname, foldername, newData}= action.payload;
            state[usernickname].folders[foldername].dataofcreaton = newData;
        },

        

        
    }
})

export const {AddNewFolder,SetFolderData, AddNewWord, DeleteFolder, DeleteWordFromFolder, CorrectFolderName, ChangeStudyingPhase, ChangeNumofstud, ChangeNumofsucc, ChangeData} = WordsStorage.actions;

export default WordsStorage.reducer;