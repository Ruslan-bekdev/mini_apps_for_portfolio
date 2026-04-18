import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type Curr = {
    [key:string]: number,
}

type CurrencyState = {
    currList: Curr,
    curr1: string,
    curr2: string,
}

const initialState: CurrencyState = {
    currList: {},
    curr1: 'USD',
    curr2: '',
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
    },
    initialState,
});

export const {
    setCurrList,
    setCurr1,
    setCurr2,
} = currencySlice.actions;

export default currencySlice.reducer;