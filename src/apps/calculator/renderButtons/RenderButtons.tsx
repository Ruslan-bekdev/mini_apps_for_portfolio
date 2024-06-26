import React, {FC,useEffect} from 'react';
import styled from "styled-components";
import {colors, flexCenter_column} from "../../../styles/styles";
import RenderNumbers from "./RenderNumbers";
import RenderOperators_right from "./RenderOperators_right";
import RenderOperators_top from "./RenderOperators_top";
import {buttonsConfig, dispatchActionTypes, Operator} from "../../../configs/calc";

interface RenderButtonsProps {
    setValue: (value: string | number) => void,
    handleBackspace: () => void,
    setResult: () => void,
    resetAll: () => void,
    buttonsWidth: number,
}

const ButtonsWrapper = styled.div<{buttonsWidth: number}>`
  width: 100%;
  display: flex;
  position: relative;  
  
  .block {
    
  }
  
  .positionAction{
    position: absolute;
    bottom: 0;
  }
  .positionAction1{
    left: 0;
  }
  .positionAction2{
    right: ${({buttonsWidth}) => buttonsWidth}px;
  }

  button {
    border-radius: 8px;
    position: relative;
    cursor: pointer;
    transition: 0.3s ease;
    font-size: 1.5em;
    border: 2px solid ${colors.mainDark};
    background-color: ${colors.secondaryDark};
    color: ${colors.mainLight};
    width: ${({buttonsWidth}) => buttonsWidth}px;
    height: ${({buttonsWidth}) => buttonsWidth}px;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgb(0, 0, 0, 0.4);
      border-radius: 8px;
      opacity: 0;
      transition: opacity 0.3s ease;
      pointer-events: none;
    }
    @media (hover: hover) {
      &:hover{
        &::before {
          opacity: 1;
        }
      }
    }
    @media (hover: none) {
      &:active{
        &::before {
          opacity: 1;
        }
      }
    }
  }

  .operators_right {
    ${flexCenter_column}
  }
`;

const RenderCalc:FC<RenderButtonsProps> =
    ({setValue,handleBackspace,setResult,resetAll,buttonsWidth}) => {
        const handleClick = (operator): void => {
            console.log(operator)
            switch (operator.dispatchAction) {
                case dispatchActionTypes.backspace: {
                    handleBackspace();
                    break;
                }
                case dispatchActionTypes.equal: {
                    setResult();
                    break;
                }
                case dispatchActionTypes.reset: {
                    resetAll();
                    break;
                }
                default: setValue(operator.value);
            }
        };
        const handleKey = (operatorValue): void => {
            switch (operatorValue) {
                case dispatchActionTypes.backspace: {
                    handleBackspace();
                    break;
                }
                case dispatchActionTypes.reset: {
                    resetAll();
                    break;
                }
            }
        };

        useEffect(()=>{
            const handleKeyDown = (event) => {
                const {key} = event;

                if ((key >= '0' && key <= '9')){
                    return setValue(key);
                }

                switch (key) {
                    case 'Backspace': {
                        handleKey(dispatchActionTypes.backspace);
                        break;
                    }
                    case 'c': {
                        handleKey(dispatchActionTypes.reset);
                        break;
                    }
                }
            };

            window.addEventListener('keydown', handleKeyDown);

            return () =>
                window.removeEventListener('keydown', handleKeyDown);
        },[]);

        return (
            <ButtonsWrapper buttonsWidth={buttonsWidth}>
                <div className='block'>
                    <RenderOperators_top
                        operators={buttonsConfig.operators.top}
                        handleClick={handleClick}
                    />
                    <RenderNumbers
                        numbers={buttonsConfig.numbers}
                        action={setValue}
                    />
                </div>
                <div className='block'>
                    <RenderOperators_right
                        operators={buttonsConfig.operators.right as Operator[]}
                        handleClick={handleClick}
                    />
                </div>
            </ButtonsWrapper>
        );
};

export default RenderCalc;