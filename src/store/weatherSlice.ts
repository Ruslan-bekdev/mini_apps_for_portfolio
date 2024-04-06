import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Data} from "../apps/weather/Weather";

type InitialData = {
    [key:string]: any,
}

type CalculatorState = {
    initialData: InitialData,
    cityName: string,
    selectedDataDate: string
    selectedData: Data[],
}

const initialState: CalculatorState = {
    initialData: [],
    cityName: '',
    selectedDataDate: '',
    selectedData: [],
};

const weatherSlice = createSlice({
    reducers: {
        setInitialData: (state, action: PayloadAction<InitialData>) => {
            state.initialData = action.payload;
        },
        setCityName: (state, action: PayloadAction<string>) => {
            state.cityName = action.payload;
        },
        resetCityName: (state) => {
            state.cityName = '';
        },
        setSelectedDataDate: (state, action: PayloadAction<string>) => {
            state.selectedDataDate = action.payload;
        },
        setNextSelectedDataDate: (state) => {
            const isDataWithNewDate = (date) =>
                state.initialData.list.some(
                    data => data.dt_txt.date === date
                );

            const date = state.selectedDataDate;
            const numberParts = date.split('-');
            const newLastNumber = +numberParts[numberParts.length-1]+1;
            let newDate: string;
            newDate = date.slice(0,-numberParts[numberParts.length-1].length) + (newLastNumber < 10 ?`0${newLastNumber}` :newLastNumber);

            if (isDataWithNewDate(newDate))
                state.selectedDataDate = newDate;
        },
        setPrevSelectedDataDate: (state) => {
            const isDataWithNewDate = (date) =>
                state.initialData.list.some(
                    data => data.dt_txt.date === date
                );

            const date = state.selectedDataDate;
            const numberParts = date.split('-');
            const newLastNumber = +numberParts[numberParts.length-1]-1;
            let newDate: string;
            newDate = date.slice(0,-numberParts[numberParts.length-1].length) + (newLastNumber < 10 ?`0${newLastNumber}` :newLastNumber);

            if (isDataWithNewDate(newDate))
                state.selectedDataDate = newDate;
        },
        setSelectedData: (state) => {
            const allSelectedDayData =
                state.initialData.list.filter((item)=>
                    item.dt_txt.date === state.selectedDataDate
            );
            state.selectedData = allSelectedDayData;
        },
    },
    name: 'weatherSlice',
    initialState,
});

export const {
    setInitialData,
    setCityName,
    resetCityName,
    setSelectedDataDate,
    setNextSelectedDataDate,
    setPrevSelectedDataDate,
    setSelectedData,
} = weatherSlice.actions;

export default weatherSlice.reducer;