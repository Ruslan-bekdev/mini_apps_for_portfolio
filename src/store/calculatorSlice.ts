import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface CalculatorState {
    numbers: number[],
    actions: string[],
    result: number | null,
}

const initialState: CalculatorState = {
    numbers: [],
    actions: [],
    result: null,
};

const calculatorSlice = createSlice({
    name: 'calculatorSlice',
    initialState,
    reducers: {
        addNumber: (state, action: PayloadAction<number>) => {
            state.numbers = [...state.numbers, action.payload];
        },
        addAction: (state, action: PayloadAction<string>) => {
            state.actions = [...state.actions, action.payload];
        },
        setResult: (state, action: PayloadAction<number>) => {
            state.result = action.payload;
        },
        resetNumbers: (state) => {
            state.numbers = [];
        },
        resetActions: (state) => {
            state.actions = [];
        },
        resetResult: (state) => {
            state.result = null;
        },
    },
});

export default calculatorSlice.reducer;