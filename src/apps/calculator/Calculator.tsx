import React, {FC} from 'react';
import styled from "styled-components";
import {flexCenter_column} from "../../styles/styles";
import RenderCalc from "./renderButtons/RenderButtons";
import RenderDisplay from "./RenderDisplay";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import {
    isNumber,

    setResult,
    setValue,
    setError,
    handleBackspace,
    resetPreResult,
    resetResult,
    resetError,
    resetAll,
} from "../../store/calculatorSlice";

export const calcWidth: number = 280;
export const buttonsWidth: number = calcWidth/4;

const Calc = styled.div`
    width: ${calcWidth}px;
    ${flexCenter_column}
`;

const Calculator:FC = () => {
    const dispatch = useDispatch();
    const {preResult,result,errorMessage} =
        useSelector((state: RootState) => state.calculatorReducer);

    const setValueAction = (value): void => {
        dispatch(setValue(value));
        result && dispatch(resetResult());
        errorMessage && dispatch(resetError());
    };
    const resetAllAction = (): void => {
        dispatch(resetAll());
    };
    const handleBackspaceAction = (): void => {
        dispatch(handleBackspace());
    };
    const setResultAction = (): void => {
        const preResultCopy = [...preResult];
        if (!isNumber(preResult[preResult.length-1]))
            preResultCopy.pop();
        const isZeroDivision = (array:string[]): boolean => {
            let result: boolean = false;
            array.map((value,index)=>{
                if (value === '/' && array[index+1] === '0')
                    result = true
            });
            return result;
        };
        if (isZeroDivision(preResultCopy)) {
            dispatch(resetAll());
            dispatch(setError('На ноль делить нельзя!'));
        } else {
            const calcResult = eval(preResultCopy.join(''));

            dispatch(setResult(calcResult));
            dispatch(resetPreResult());
            dispatch(setValue(calcResult));
        }
    };

    return (
        <Calc>
            <RenderDisplay
                preResult={preResult}
                result={result}
                errorMessage={errorMessage}
            />
            <RenderCalc
                setValue={setValueAction}
                resetAll={resetAllAction}
                setResult={setResultAction}
                handleBackspace={handleBackspaceAction}
                buttonsWidth={buttonsWidth}
            />
        </Calc>
    );
};

export default Calculator;