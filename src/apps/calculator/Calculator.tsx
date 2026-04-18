import React, {FC} from 'react';
import styled from "styled-components";
import {flexCenter_column} from "../../styles/styles";
import RenderButtons from "./renderButtons/RenderButtons";
import RenderDisplay from "./RenderDisplay";
import {useSelector} from "react-redux";
import {RootState} from "../../store";

export const calcWidth: number = 280;
export const buttonsWidth: number = calcWidth/4;

const Calc = styled.div`
    width: ${calcWidth}px;
    ${flexCenter_column}
`;

const Calculator:FC = () => {
    const {preResult,errorMessage} = useSelector((state: RootState) => state.calculatorReducer);

    return (
        <Calc>
            <RenderDisplay
                preResult={preResult}
                errorMessage={errorMessage}
            />
            <RenderButtons
                buttonsWidth={buttonsWidth}
            />
        </Calc>
    );
};
//0.00000188/3
export default Calculator;