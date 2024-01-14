import React,{FC} from 'react';
import styled from "styled-components";
import {colors, container, flexCenter_column, flexStart, margins} from "../../styles/styles";
import RenderButtons from "./RenderButtons";
import RenderDisplay from "../mainPage/RenderDisplay";
import RenderMenu from "../mainPage/RenderMenu";

export const calcWidth: number = 300;
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
    return (
        <Calc>
            <h1>Калькулятор</h1>
            <div>
                <RenderMenu/>
                <RenderDisplay/>
                <RenderButtons buttonsWidth={buttonsWidth}/>
            </div>
        </Calc>
    );
};

export default CalcPage;