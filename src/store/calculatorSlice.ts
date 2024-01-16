import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type PreResult = (number|string)[]

interface CalculatorState {
    preResult: PreResult,
    result: number,
}

const initialState: CalculatorState = {
    preResult: [0],
    result: 0,
};

const calculatorSlice = createSlice({
    name: 'calculatorSlice',
    initialState,
    reducers: {
        setValue: (state, action: PayloadAction<number | string>) => {
            const lastValueIndex = state.preResult.length - 1;
            const lastValue = state.preResult[lastValueIndex];

            switch (typeof action.payload) {
                case "string":{
                    if (typeof lastValue === 'number' && lastValue === 0 && action.payload === '-') {
                        state.preResult = [...state.preResult, action.payload];
                    } else if (typeof lastValue === 'string' && lastValue === '%' && action.payload !== '%') {
                        state.preResult = [...state.preResult, action.payload];
                    } else if (typeof lastValue === 'number' && action.payload === '.' && !lastValue.toString().includes('.')) {
                        state.preResult[lastValueIndex] = `${lastValue}${action.payload}`;
                    } else if (typeof lastValue === 'number') {
                        if (action.payload === '.') {
                            const currentNumberString = lastValue.toString();
                            const dotCount = currentNumberString.split('.').length - 1;
                            if (dotCount === 0) {
                                state.preResult = [...state.preResult, action.payload];
                            }
                        } else {
                            state.preResult = [...state.preResult, action.payload];
                        }
                    }
                    break;
                }
                case "number": {
                    if (typeof state.preResult[lastValueIndex] === 'number') {
                        state.preResult[lastValueIndex] =
                            +`${lastValue}${action.payload}`;
                    } else if (typeof state.preResult[lastValueIndex] === 'number' && lastValueIndex === 0 && lastValue === 0) {
                        state.preResult[lastValueIndex] = action.payload;
                    } else {
                        state.preResult = [...state.preResult,action.payload];
                    }
                }
            }
            // console.log(state.preResult)
        },
        setResult: (state, action: PayloadAction<number>) => {
            state.result = action.payload;
        },
        handleBackspace: (state) => {
            console.log(state.preResult)
            const lastValueIndex = state.preResult.length - 1;
            const lastValue = state.preResult[lastValueIndex];

            if (typeof lastValue === 'string' && lastValue.length > 1) {
                state.preResult[lastValueIndex] = lastValue.slice(0, -1);
            } else if (state.preResult.length > 1) {
                state.preResult.pop();
            }
        },
        resetPreResult: (state) => {
            state.preResult = [0];
        },
        resetResult: (state) => {
            state.result = 0;
        },
        resetAll: (state) => {
            state.preResult = [0,];
            state.result = 0;
        },
    },
});

export const {
    setValue,setResult,handleBackspace,
    resetPreResult,resetResult,resetAll
} = calculatorSlice.actions;

export default calculatorSlice.reducer;