import { configureStore } from "@reduxjs/toolkit";
import wordsReducer from './words/WordsStorage'

export const store = configureStore({
    reducer: {
        wordsList: wordsReducer,
    }
})

export type RootState =  ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;