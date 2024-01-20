import {configureStore} from "@reduxjs/toolkit";
import {createLogger} from 'redux-logger';
import calculatorReducer from "./calculatorSlice";

export type RootState = ReturnType<typeof store.getState>;

const store = configureStore({
    reducer: {
        calculatorReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(createLogger()),
});

export default store;