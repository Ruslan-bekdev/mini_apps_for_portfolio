import React, {FC} from 'react';
import styled from "styled-components";
import {colors, container, flexCenter_column, margins} from "../../styles/styles";
import RenderButtons from "./renderButtons/RenderButtons";
import RenderDisplay from "./RenderDisplay";
import RenderMenu from "./RenderMenu";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import {
    resetAll,
    resetPreResult,
    resetResult,
    setResult,
    handleBackspace,
    setValue
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
    padding: 5px;
    box-sizing: content-box;
    margin-top: ${margins.title};
    ${flexCenter_column}
  }
`;

const CalcPage:FC = () => {
    // Бэкскейп исправить,
    // вместо модуля настройка округления,
    // исправить ошибку при операциями меджу двумя процентами,
    // меню сделать
    const dispatch = useDispatch();
    const {preResult,result} = useSelector((state: RootState) => state.calculatorReducer);

    const setValueAction = (value) => {
        dispatch(setValue(value));
        dispatch(resetResult());
    };
    const resetAllAction = () => {
        dispatch(resetAll());
    }
    const handleBackspaceAction = () => {
      dispatch(handleBackspace());
    }
    const percentCalculate = (tokens) => {
        for (let i = 0; i < tokens.length; i++) {
            if (typeof tokens[i] === 'string' && tokens[i].includes('%')) {
                let percentIndex = i;

                while (percentIndex >= 0 && !parseFloat(tokens[percentIndex])) {
                    percentIndex--;
                }

                if (percentIndex >= 0) {
                    let percentValue = parseFloat(tokens[percentIndex]) / 100;

                    if (percentIndex - 1 >= 0) {
                        let prevNumber = parseFloat(tokens[percentIndex - 2]);
                        percentValue *= prevNumber;
                    }

                    tokens[percentIndex] = percentValue.toString();
                }

                tokens[i] = tokens[i].replace('%', '');

                !tokens[i] && tokens.splice(i, 1);
            }
        }
        return tokens;
    };
    const setResultAction = () => {
        let preResultCopy = [...preResult];

        if (typeof preResultCopy[preResultCopy.length - 1] !== 'number' && preResult[preResultCopy.length - 1] !== '%') {
            preResultCopy = preResultCopy.slice(0, -1);
        }

        const regex = /(-?\d+(\.\d+)?)([%+-/*])?/g;
        const resultArray: (number | string)[] = [];
        let match;
        while ((match = regex.exec(preResultCopy.join(''))) !== null) {
            const [fullMatch, number, decimal, operator] = match as [string, string, string, string];
            const parsedNumber = decimal ? parseFloat(`${number}.${decimal}`) : parseFloat(number);
            resultArray.push(parsedNumber);
            operator && resultArray.push(operator);
        }

        const updatedResult = percentCalculate(resultArray);
        const updatedResultString = updatedResult.join('');

        const floorToFourDecimals = (num: number) => {
            const multiplier = Math.pow(10, 4);
            return Math.floor(num * multiplier) / multiplier;
        };

        const newResult = eval(updatedResultString);
        const roundedResult = floorToFourDecimals(newResult);
        dispatch(setResult(roundedResult));
        dispatch(resetPreResult());
        dispatch(setValue(roundedResult));
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