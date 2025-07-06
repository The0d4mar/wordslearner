import { configureStore } from "@reduxjs/toolkit";
import wordsReducer from './words/WordsStorage'
import PairStorage  from "./addfolder/FolderAdder";

export const store = configureStore({
    reducer: {
        wordsList: wordsReducer,
        pairStorage: PairStorage,
    }
})

export type RootState =  ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;