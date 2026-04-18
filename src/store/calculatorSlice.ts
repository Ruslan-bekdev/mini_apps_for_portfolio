import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type PreResult = string[]

interface CalculatorState {
    preResult: PreResult,
    maxDecimalDigits: number,
    errorMessage: string | null,
}

const initialState: CalculatorState = {
    preResult: ['0'],
    maxDecimalDigits: 8,
    errorMessage: null,
};

export const isNumber = (value: string) => !isNaN(+value) && !isNaN(parseFloat(value));

const calculatorSlice = createSlice({
    reducers: {
        setValue: (state, {payload}: PayloadAction<string>) => {
            state.errorMessage = null;
            const lastIndex = state.preResult.length - 1;
            const lastValue = state.preResult[lastIndex];

            if (lastValue === 'Infinity' || lastValue === '-Infinity' || lastValue === 'NaN') {
                state.preResult = isNumber(payload) ?[payload] :['0', payload];
                return;
            }

            if (payload === '.') {
                if (!lastValue.includes('.') && isNumber(lastValue))
                    state.preResult[lastIndex] += '.';
                return;
            }

            if (payload === '%') {
                if (isNumber(lastValue) && !lastValue.endsWith('.'))
                    state.preResult[lastIndex] = parseFloat((+lastValue / 100).toPrecision(12)).toString();
                return;
            }

            if (
                (['*', '/', '+', '-'].includes(payload) && lastValue.endsWith('.')) ||
                (['*', '/', '+'].includes(payload) && !isNumber(lastValue)) ||
                (payload === '-' && lastValue === '-')
            ) return;

            if (lastValue === '0' && isNumber(payload))
                state.preResult[lastIndex] = payload;
            else if (isNumber(lastValue) && isNumber(payload))
                state.preResult[lastIndex] += payload;
            else
                state.preResult.push(payload);
        },
        setResult: (state) => {
            let expression = state.preResult.join('').replace(/[*/\-+.]+$/, '');
            const numReg = /(-?[\d.]+(?:e[+-]?\d+)?)/.source;

            if (/\/-*0(\.0*)?($|[^\d])/.test(expression)) {
                state.errorMessage = 'You can\'t divide by zero!';
                state.preResult = ['0'];
                return;
            }

            const ops = [
                {reg: new RegExp(`${numReg}\\*{2}${numReg}`), op: '(\\*{2})', calculate: (a: number, b: number) => Math.pow(a, b)},
                {reg: new RegExp(`${numReg}[*/]${numReg}`), op: '([*/])', calculate: (a: number, b: number, op: string) => (op === '*' ?a * b :a / b)},
                {reg: new RegExp(`${numReg}[+-]${numReg}`), op: '([+-])', calculate: (a: number, b: number, op: string) => (op === '+' ?a + b :a - b)}
            ];

            for (const step of ops) {
                while (step.reg.test(expression)) {
                    const prev = expression;
                    expression = expression.replace(new RegExp(`${numReg}${step.op}${numReg}`),
                        (_: string, n1: string, op: string, n2: string) => step.calculate(+n1, +n2, op).toString());
                    if (prev === expression) break;
                }
            }

            if (expression === 'Infinity' || expression === '-Infinity' || expression === 'NaN') {
                state.errorMessage = 'Size error';
                state.preResult = ['0'];
                return;
            }

            let finalResult = parseFloat((+expression).toPrecision(12)).toString();

            if (finalResult.includes('.') && finalResult.split('.')[1].length > state.maxDecimalDigits)
                finalResult = (+finalResult).toFixed(state.maxDecimalDigits).replace(/\.?0+$/, '');

            state.preResult = [finalResult === '-0' ?'0' :finalResult];
        },
        resetAll: (state) => {
            state.preResult = ['0'];
            state.errorMessage = null;
        },
        handleBackspace: (state) => {
            const lastIdx = state.preResult.length - 1;
            state.preResult[lastIdx].length > 1
                ?state.preResult[lastIdx] = state.preResult[lastIdx].slice(0, -1)
                :state.preResult.length === 1 ?state.preResult = ['0'] :state.preResult.pop();
        }
    },
    name: 'calculatorSlice',
    initialState,
});

export const {setValue, setResult, handleBackspace, resetAll} = calculatorSlice.actions;
export default calculatorSlice.reducer;