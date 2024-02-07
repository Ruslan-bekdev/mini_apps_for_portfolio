import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type CalculatorState = {
    data: any,
    cityName: string,
    daysCount: number,
}

const initialState: CalculatorState = {
    data: {},
    cityName: '',
    daysCount: 1,
};

const weatherSlice = createSlice({
    reducers: {
        setData: (state, action: PayloadAction<{}>) => {
            state.data = action.payload;
        },
        setCityName: (state, action: PayloadAction<string>) => {
            state.cityName = action.payload;
        },
        setDaysCount: (state, action: PayloadAction<number>) => {
            state.daysCount = action.payload;
        },
        resetCityName: (state) => {
            state.cityName = '';
        },
        resetDaysCount: (state) => {
            state.daysCount = 1;
        },
    },
    name: 'weatherSlice',
    initialState,
});

export const {
    setData,
    setCityName,
    setDaysCount,
    resetCityName,
    resetDaysCount,
} = weatherSlice.actions;

export default weatherSlice.reducer;