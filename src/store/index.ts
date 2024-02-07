import {configureStore} from "@reduxjs/toolkit";
import {createLogger} from 'redux-logger';
import {thunk} from 'redux-thunk';

import calculatorReducer from "./calculatorSlice";
import weatherReducer from "./weatherSlice";
import currencyReducer from "./currencySlice";

export type RootState = ReturnType<typeof store.getState>;

const store = configureStore({
    reducer: {
        calculatorReducer,
        weatherReducer,
        currencyReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(createLogger(),thunk),
});

export default store;