import React, {FC} from 'react';
import styled from "styled-components";
import {colors, container, flexCenter_column, margins} from "../../styles/styles";
import RenderButtons from "./renderButtons/RenderButtons";
import RenderDisplay from "./RenderDisplay";
import RenderMenu from "./RenderMenu";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import {
    isNumber,

    resetAll,
    resetPreResult,
    handleBackspace,
    resetResult,
    setResult,
    preResultRounding,
    setValue,
} from "../../store/calculatorSlice";

export const calcWidth: number = 280;
export const buttonsWidth: number = calcWidth/4;

const Calc = styled.div`
  ${container}
  &>div{
    width: ${calcWidth}px;
    margin-inline: auto;
    border: 2px solid ${colors.secondaryLight};
    border-radius: 8px;
    box-sizing: content-box;
    margin-top: ${margins.title};
    ${flexCenter_column}
  }
`;

const CalcPage:FC = () => {
    const dispatch = useDispatch();
    const {preResult,result} =
        useSelector((state: RootState) => state.calculatorReducer);

    const setValueAction = (value) => {
        dispatch(setValue(value));
        dispatch(preResultRounding());
        result && dispatch(resetResult());
    };
    const resetAllAction = () => {
        dispatch(resetAll());
    };
    const handleBackspaceAction = () => {
        dispatch(handleBackspace());
    };
    const setResultAction = () => {
        const preResultCopy = [...preResult];
        if (!isNumber(preResult[preResult.length-1]))
            preResultCopy.pop();
        const calcResult = eval(preResultCopy.join(''));

        dispatch(setResult(calcResult));
        dispatch(resetPreResult());
        dispatch(setValue(calcResult));
    };

    return (
        <Calc>
            <h1>Калькулятор</h1>
            <div>
                <RenderMenu dispatch={dispatch}/>
                <RenderDisplay
                    preResult={preResult}
                    result={result}
                    dispatch={dispatch}
                />
                <RenderButtons
                    setValue={setValueAction}
                    resetAll={resetAllAction}
                    setResult={setResultAction}
                    handleBackspace={handleBackspaceAction}
                    buttonsWidth={buttonsWidth}
                />
            </div>
        </Calc>
    );
};

export default CalcPage;