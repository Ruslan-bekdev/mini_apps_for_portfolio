import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {WeatherItem} from "../apps/weather/Weather";

interface WeatherResponse {
    list: WeatherItem[];
    city?: {
        name: string;
        country: string;
    };
}

type WeatherState = {
    initialData: WeatherResponse | null,
    cityName: string,
    selectedDataDate: string
    selectedData: WeatherItem[],
}

const initialState: WeatherState = {
    initialData: null,
    cityName: '',
    selectedDataDate: '',
    selectedData: [],
};

const hasDataForDate = (data: WeatherResponse | null, date: string) => {
    return data?.list.some(item => item.dt_txt.date === date) ?? false;
};

const weatherSlice = createSlice({
    reducers: {
        setInitialData: (state, action: PayloadAction<WeatherResponse>) => {
            state.initialData = action.payload;
        },
        resetInitialData: (state) => {
            state.initialData = null;
        },
        setCityName: (state, action: PayloadAction<string>) => {
            state.cityName = action.payload;
        },
        setSelectedDataDate: (state, action: PayloadAction<string>) => {
            state.selectedDataDate = action.payload;
        },
        updateSelectedDate: (state, action: PayloadAction<number>) => {
            if (!state.selectedDataDate) return;

            const dateParts = state.selectedDataDate.split('-');
            const lastPart = dateParts.pop();
            if (!lastPart) return;

            const nextDay = +lastPart + action.payload;
            const paddedDay = nextDay.toString().padStart(2, '0');
            const newDate = [...dateParts, paddedDay].join('-');

            if (hasDataForDate(state.initialData, newDate)) {
                state.selectedDataDate = newDate;
            }
        },
        setSelectedData: (state) => {
            if (!state.initialData) return;
            state.selectedData = state.initialData.list.filter((item)=>
                item.dt_txt.date === state.selectedDataDate
            )
        },
    },
    name: 'weatherSlice',
    initialState,
});

export const {
    setInitialData,
    resetInitialData,
    setCityName,
    setSelectedDataDate,
    setSelectedData,
} = weatherSlice.actions;

export const setNextSelectedDataDate = () => weatherSlice.actions.updateSelectedDate(1);
export const setPrevSelectedDataDate = () => weatherSlice.actions.updateSelectedDate(-1);

export default weatherSlice.reducer;