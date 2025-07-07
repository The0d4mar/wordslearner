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
        AddNewFolder: (state, action: PayloadAction<string>) =>{
            const [usernickname, newFolderName] = action.payload.split(';');
            const dateOfCreation = '';
            state[usernickname].folders[newFolderName] = {dataofcreaton:dateOfCreation, words: {}, publicFlag: false}
        },

        SetFolderData: (state, action: PayloadAction<string>) =>{
            const [usernickname, newFolderName, dateOfCreation] = action.payload.split(';');
            state[usernickname].folders[newFolderName].dataofcreaton = dateOfCreation;

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

        },


        ChangeStudyingPhase: (state, action: PayloadAction<string>) =>{
            const [usernickname, foldername, targetWord, newstudyPhase] = action.payload.split(';');
            state[usernickname].folders[foldername].words[targetWord].studyingPhase = +newstudyPhase;
        },

        ChangeNumofstud: (state, action: PayloadAction<string>) =>{
            const [usernickname, foldername, targetWord, newstudyPhase] = action.payload.split(';');
            state[usernickname].folders[foldername].words[targetWord].numofstud = +newstudyPhase;
        },

        ChangeNumofsucc: (state, action: PayloadAction<string>) =>{
            const [usernickname, foldername, targetWord, newstudyPhase] = action.payload.split(';');
            state[usernickname].folders[foldername].words[targetWord].numofsucc = +newstudyPhase;
        },

        ChangeData: (state, action: PayloadAction<string>) =>{
            const [usernickname, foldername, newData] = action.payload.split(';');
            state[usernickname].folders[foldername].dataofcreaton = newData;
        },

        

        
    }
})

export const {AddNewFolder,SetFolderData, AddNewWord, DeleteFolder, DeleteWordFromFolder, CorrectFolderName, ChangeStudyingPhase, ChangeNumofstud, ChangeNumofsucc, ChangeData} = WordsStorage.actions;

export default WordsStorage.reducer;