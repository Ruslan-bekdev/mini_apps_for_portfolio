import {configureStore} from "@reduxjs/toolkit";
import calculatorReducer from "./calculatorSlice";

const store = configureStore({
    reducer: {
        calculatorReducer,
    },
});

export default store;