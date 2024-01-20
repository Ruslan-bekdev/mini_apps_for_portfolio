import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type PreResult = string[]

interface CalculatorState {
    preResult: PreResult,
    result: number,
    maxDecimalDigits: number | null,
}

const initialState: CalculatorState = {
    preResult: ['0'],
    result: 0,
    maxDecimalDigits: 8,
};

export const isNumber = (value: string | number) => !isNaN(+value);

const calculatorSlice = createSlice({
    reducers: {
        setValue: (state, action: PayloadAction<number | string>) => {
            const payload = action.payload;
            const lastValueIndex = state.preResult.length - 1;
            const lastValue = state.preResult[lastValueIndex];

            if (lastValue === '0' && lastValueIndex === 0) {
                isNumber(payload)
                    ?state.preResult[lastValueIndex] = payload.toString()
                    :state.preResult = [...state.preResult, payload.toString()];
            } else if (isNumber(lastValue) && !isNumber(payload)) {
                switch (payload) {
                    case '%':{
                        const percentCalculate =
                            (+lastValue / 100 * (+state.preResult[lastValueIndex - 2] || 1));

                        state.preResult[lastValueIndex] = percentCalculate.toString();
                        break;
                    }
                    case '.':{
                        if (!lastValue.includes('.'))
                            state.preResult[lastValueIndex] += payload;
                        break;
                    }
                    default:
                        state.preResult = [...state.preResult, payload.toString()];
                }
            } else if (isNumber(lastValue) && isNumber(payload)) {
                state.preResult[lastValueIndex] += payload;
            } else if (isNumber(lastValue) || isNumber(payload)) {
                state.preResult = [...state.preResult, payload.toString()];
            }
        },
        preResultRounding: (state) => {
            const removeLastZeros = () => {
                state.preResult = state.preResult.map((value) => {
                    const roundedNumber = (+value).toPrecision(state.maxDecimalDigits || undefined);
                    return isNumber(value) && value.includes('.')
                        ?roundedNumber.replace(/0+$/, '')
                        :value;
                });
            };
            removeLastZeros();
        },
        handleBackspace: (state) => {
            state.preResult.length === 1
                ?state.preResult = ['0']
                :state.preResult.pop();
        },
        setResult: (state, action: PayloadAction<number>) => {
            const roundedNumber =
                Number(action.payload.toFixed(
                    state.maxDecimalDigits
                    || undefined
                ));
            state.result = roundedNumber;
        },
        resetPreResult: (state) => {
            state.preResult = ['0'];
        },
        resetResult: (state) => {
            state.result = 0;
        },
        resetAll: (state) => {
            state.preResult = ['0'];
            state.result = 0;
        },
    },
    name: 'calculatorSlice',
    initialState,
});

export const {
    setValue,handleBackspace,
    setResult,preResultRounding,
    resetPreResult,resetResult,resetAll
} = calculatorSlice.actions;

export default calculatorSlice.reducer;