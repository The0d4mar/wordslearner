import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChangePrivateFlag } from "../addfolder/FolderAdder";

interface WordInfo{
    wordtrans: string;
    studyingPhase: number;
    numofstud: number;
    numofsucc: number;
}

interface Word{
    dataofcreaton: string;
    uniqeCode: string;
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
            uniqeCode: '0607202517394135vladgorn',
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
            username: 'vovagorn',
            password: '1234@passw',
            login: 'vladimir@mail.com',
        },
    }
};
export const WordsStorage = createSlice({
    name: "wordList",
    initialState,
    reducers:{
        AddNewFolder: (state, action: PayloadAction<{usernickname: string; newFolderName: string; uniqeCode:string}>) =>{
            const {usernickname, newFolderName, uniqeCode} = action.payload;
            const dateOfCreation = '';
            state[usernickname].folders[newFolderName] = {dataofcreaton:dateOfCreation, words: {}, publicFlag: false, uniqeCode: uniqeCode}
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

        ChangeUniqeCode: (state, action: PayloadAction<{usernickname:string; foldername:string; newcode:string;}>) =>{
            const {usernickname, foldername, newcode}= action.payload;
            state[usernickname].folders[foldername].uniqeCode = newcode;
        },

        ChangePublicFlag:(state, action: PayloadAction<{usernickname:string; foldername:string; newFlag:boolean;}>)=>{
            const {usernickname, foldername, newFlag}= action.payload;
            state[usernickname].folders[foldername].publicFlag = newFlag;
        },

        AddNewUser:(state, action: PayloadAction<{newUserNickname:string; password:string; login:string;}>)=>{
            const {newUserNickname, password, login} = action.payload;

            state[newUserNickname] =  {
                folders: {
                },
                userdata: {
                    username: newUserNickname,
                    password: password,
                    login: login,
                },
            }

        },


        CopyNewFolder : (state, action: PayloadAction<{nickname: string, nameofCopiedFolder: string; copiedFolder: Word}>) =>{

            const {nickname, nameofCopiedFolder, copiedFolder} = action.payload;

            state[nickname].folders[nameofCopiedFolder] = copiedFolder;

        }



        

        
    }
})

export const {ChangeUniqeCode, AddNewUser, CopyNewFolder, ChangePublicFlag, AddNewFolder,SetFolderData, AddNewWord, DeleteFolder, DeleteWordFromFolder, CorrectFolderName, ChangeStudyingPhase, ChangeNumofstud, ChangeNumofsucc, ChangeData} = WordsStorage.actions;

export default WordsStorage.reducer;