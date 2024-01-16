import React, {Dispatch, FC} from 'react';
import {UnknownAction} from "redux";
import styled from "styled-components";
import {PreResult} from "../../store/calculatorSlice";

interface RenderDisplayProps {
    preResult: PreResult,
    result: number,
    dispatch: Dispatch<UnknownAction>,
}

const DisplayWrapper = styled.div`
  width: 100%;
  padding: 5px;
  box-sizing: border-box;
  overflow-x: auto;
    .value{
      text-align: right;
    }
`;

const RenderDisplay: FC<RenderDisplayProps> = ({preResult,result,dispatch}) => {

    const showResult = () => {
        return result ?result :preResult.join('');
    }

    return(
        <DisplayWrapper>
            <h2 className='value'>{showResult()}</h2>
        </DisplayWrapper>
    );
};

export default RenderDisplay;