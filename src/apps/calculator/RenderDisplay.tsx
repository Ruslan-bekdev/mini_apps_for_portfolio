import React, {FC} from 'react';
import styled from "styled-components";
import {PreResult} from "../../store/calculatorSlice";

interface RenderDisplayProps {
    preResult: PreResult,
    errorMessage: string | null,
}

const DisplayWrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: flex;

  .value {
    width: 100%;
    padding: 5px;
    overflow-x: auto;
  }
`;

const RenderDisplay: FC<RenderDisplayProps> = ({preResult,errorMessage}) =>
    <DisplayWrapper>
        <h2 className='value'>{errorMessage?errorMessage:preResult.join('')}</h2>
    </DisplayWrapper>

export default RenderDisplay;