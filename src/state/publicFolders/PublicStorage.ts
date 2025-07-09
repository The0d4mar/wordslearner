import { createSlice } from "@reduxjs/toolkit";

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



interface publicFolder{

    [foldername: string]: Word;
}

const initialState: publicFolder = {

}

export const PublicStorage = createSlice({
    name: 'publicStorag',
     initialState,
     reducers:{


     }
})