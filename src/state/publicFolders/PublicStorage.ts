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
    uniqeCode: string
    words: {
        [originLang: string]: WordInfo;
    };
}

interface GlobalWord{
    creator: string;
    folderBody: Word;
}



interface publicFolder{

    [foldername: string]: GlobalWord;
}

const initialState: publicFolder = {

}

export const PublicStorage = createSlice({
    name: 'publicStorag',
     initialState,
     reducers:{
        AddFolderToGlobalStorage: (state, action:PayloadAction<{foldername: String; creator: string; folderobject: Word}>) =>{
            const {foldername, creator, folderobject} = action.payload;
            const uniqeFolderName = `${creator}:${foldername}:${folderobject.uniqeCode}`
            state[uniqeFolderName] = {creator: creator, folderBody: folderobject}
            state[uniqeFolderName].folderBody.uniqeCode = `${folderobject.uniqeCode}_${creator}_copy`
        },

        DeleteFolderFromGlobalStorage: (state, action:PayloadAction<{foldername:string; creator: string; folder: Word}>) =>{
            const {foldername, creator, folder} = action.payload;
            delete state[`${creator}:${foldername}:${folder.uniqeCode}`]
        }

     }
})

export const { AddFolderToGlobalStorage, DeleteFolderFromGlobalStorage } = PublicStorage.actions;
export const publicStorag = PublicStorage.reducer;