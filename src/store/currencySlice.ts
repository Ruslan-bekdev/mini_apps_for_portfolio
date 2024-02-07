import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type Curr = {
    [key:string]: number,
}

type CurrencyState = {
    currList: Curr,
    curr1: string,
    curr2: string,
    curr1Value: string,
    curr2Value: string,
}

const initialState: CurrencyState = {
    currList: {},
    curr1: '',
    curr2: 'KGS',
    curr1Value: '',
    curr2Value: '',
}

const currencySlice = createSlice({
    name: 'currencySlice',
    reducers: {
        setCurrList: (state, action: PayloadAction<Curr>) => {
            state.currList = action.payload;
        },
        setCurr1: (state, action: PayloadAction<string>) => {
            state.curr1 = action.payload;
        },
        setCurr2: (state, action: PayloadAction<string>) => {
            state.curr2 = action.payload;
        },
        setCurr1Value: (state, action: PayloadAction<string>) => {
            state.curr1Value = action.payload;
        },
        setCurr2Value: (state, action: PayloadAction<string>) => {
            state.curr2Value = action.payload;
        },
        setEmptyValue: (state) => {
            state.curr1Value = '';
            state.curr2Value = '';
        },
    },
    initialState,
});

export const {
    setCurrList,
    setCurr1,
    setCurr2,
    setCurr1Value,
    setCurr2Value,
    setEmptyValue,
} = currencySlice.actions;

export default currencySlice.reducer;