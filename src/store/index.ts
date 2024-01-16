import {configureStore} from "@reduxjs/toolkit";
import calculatorReducer from "./calculatorSlice";

export type RootState = ReturnType<typeof store.getState>;

const store = configureStore({
    reducer: {
        calculatorReducer,
    },
});

export default store;