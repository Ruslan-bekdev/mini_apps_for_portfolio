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
  box-sizing: border-box;
  display: flex;

  .value {
    width: 100%;
    padding: 20px 5px;
    overflow-x: auto;
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