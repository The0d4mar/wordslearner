import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface StaticForEditor{
    studyingPhase: number;
    numofstud: number;
    numofsucc: number;
}

interface PairFolder{
    originalWord:string;
    wordTranslate:string;
    statistic: StaticForEditor;
}


interface foldAdder{
    folderName: string
    dataofcreaton: string;
    publicFlag:boolean;
    uniqeCode:string;
    pairs: {
        [pairnumber: string]: PairFolder;
    }
}

const initialState: foldAdder = {

    folderName: '',
    dataofcreaton: '',
    publicFlag: false,
    uniqeCode: '',
    pairs: {
        '1':{
            originalWord: '',
            wordTranslate: '',
            statistic:{
                studyingPhase: 1,
                numofstud: 1,
                numofsucc: 1,
            }

        },

        '2':{
            originalWord: '',
            wordTranslate: '',
            statistic:{
                studyingPhase: 1,
                numofstud: 1,
                numofsucc: 1,
            }
        },
    }
}

export const PairStorage = createSlice({
    name: "pairStorage",
    initialState,
    reducers:{

        ChangeFolderName: (state, action: PayloadAction<string>) =>{
            state.folderName = action.payload;
        },

        AddNewPair: (state, action: PayloadAction<string>) =>{
            state.pairs[action.payload] = {
                                        originalWord: '',
                                        wordTranslate: '',
                                        statistic:{
                                            studyingPhase: 1,
                                            numofstud: 1,
                                            numofsucc: 1,
                                        }
                                    }
        },

        DeletePair: (state, action: PayloadAction<string>) =>{
            delete state.pairs[action.payload]
        },

        ChangeOriginalWord: (state, action: PayloadAction<{pairnumber:string; originalWord:string;}>) =>{
            const {pairnumber, originalWord} = action.payload;
            state.pairs[pairnumber] = {...state.pairs[pairnumber], originalWord: originalWord}

        },

        ChangeTranslateWord: (state, action: PayloadAction<{pairnumber:string; translateWord:string}>) =>{
            const {pairnumber, translateWord} = action.payload;
            state.pairs[pairnumber] = {...state.pairs[+pairnumber], wordTranslate: translateWord}
        },

        ChangeStatistic: (state, action: PayloadAction<{pairkey:string; studyingPhase:string; numofstud:string; numofsucc:string; dataofcreaton:string;}>) =>{
            const {pairkey, studyingPhase, numofstud, numofsucc, dataofcreaton} = action.payload;
            state.dataofcreaton = dataofcreaton;
            state.pairs[pairkey].statistic = {
                studyingPhase: +studyingPhase,
                numofstud: +numofstud,
                numofsucc: +numofsucc
            }
        },

        ChangePrivateFlag: (state, action: PayloadAction<boolean>) =>{
            state.publicFlag = action.payload;
        },

        ChangeUniqeCode: (state, action: PayloadAction<string>) =>{
            state.uniqeCode = action.payload;
        },


        CleanPairStorage: () =>{
            return {
                folderName: '',
                dataofcreaton: '',
                publicFlag: false,
                uniqeCode: '',
                pairs: {
                        '1': { originalWord: '', wordTranslate: '', statistic:{
                                            studyingPhase: 1,
                                            numofstud: 1,
                                            numofsucc: 1,
                                        } },
                        '2': { originalWord: '', wordTranslate: '', statistic:{
                                            studyingPhase: 1,
                                            numofstud: 1,
                                            numofsucc: 1,

                                        } },
                    },
                }
        }
    }
})

export const {ChangeUniqeCode, ChangePrivateFlag, ChangeFolderName, AddNewPair, DeletePair, ChangeOriginalWord, ChangeTranslateWord, ChangeStatistic, CleanPairStorage} = PairStorage.actions;

export default PairStorage.reducer;