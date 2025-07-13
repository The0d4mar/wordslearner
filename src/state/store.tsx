import { configureStore } from "@reduxjs/toolkit";
import wordsReducer from './words/WordsStorage'
import PairStorage  from "./addfolder/FolderAdder";
import { authReducer } from "./autheredUser/AutheredUser";
import { publicStorag } from "./publicFolders/PublicStorage";

export const store = configureStore({
    reducer: {
        wordsList: wordsReducer,
        pairStorage: PairStorage,
        autherUser: authReducer,
        publicStorag: publicStorag,
    }
})

export type RootState =  ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;