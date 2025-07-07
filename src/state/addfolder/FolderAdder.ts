import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PairFolder{
    originalWord:string;
    wordTranslate:string;
}


interface foldAdder{
    [pairnumber: string]: PairFolder;
}

const initialState: foldAdder = {
    '1':{
        originalWord: '',
        wordTranslate: ''
    },

    '2':{
        originalWord: '',
        wordTranslate: ''
    },
}

export const PairStorage = createSlice({
    name: "pairStorage",
    initialState,
    reducers:{

        AddNewPair: (state, action: PayloadAction<string>) =>{
            state[action.payload] = {
                                        originalWord: '',
                                        wordTranslate: ''
                                    }
        },

        DeletePair: (state, action: PayloadAction<string>) =>{
            delete state[action.payload]
        },

        ChangeOriginalWord: (state, action: PayloadAction<string>) =>{
            const [pairnumber, originalWord] = action.payload.split(';')
            state[pairnumber] = {...state[+pairnumber], originalWord: originalWord}

        },

        ChangeTranslateWord: (state, action: PayloadAction<string>) =>{
            const [pairnumber, translateWord] = action.payload.split(';')
            state[pairnumber] = {...state[+pairnumber], wordTranslate: translateWord}
        },

        CleanPairStorage: () =>{
            return {
                        '1': { originalWord: '', wordTranslate: '' },
                        '2': { originalWord: '', wordTranslate: '' },
                    };
        }
    }
})

export const {AddNewPair, DeletePair, ChangeOriginalWord, ChangeTranslateWord, CleanPairStorage} = PairStorage.actions;

export default PairStorage.reducer;