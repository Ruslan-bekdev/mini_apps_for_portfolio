import React, {FC} from 'react';
import styled from "styled-components";

const DisplayWrapper = styled.div`
  width: 100%;
  padding: 5px;
  box-sizing: border-box;
    .value{
      text-align: right;
    }
`;

const RenderDisplay: FC = () => {
    return(
        <DisplayWrapper>
            <h2 className='value'>0</h2>
        </DisplayWrapper>
    );
};

export default RenderDisplay;