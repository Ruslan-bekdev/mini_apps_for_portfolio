import React,{FC} from 'react';
import styled from "styled-components";
import {colors, flexCenter_column} from "../../styles/styles";

interface RenderButtonsProps {
    buttonsWidth: number
}

const ButtonsWrapper = styled.div<{ buttonsWidth: number }>`
  width: 100%;
  display: flex;

  .block {

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
    width: ${(props) => props.buttonsWidth}px;
    height: ${(props) => props.buttonsWidth}px;

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

    &:hover {
      transform: scale(104%);

      &::before {
        opacity: 1;
      }
    }
  }

  .actions_right {
    ${flexCenter_column}
  }
`;

const RenderButtons:FC<RenderButtonsProps> = ({buttonsWidth}) => {
    return (
        <ButtonsWrapper buttonsWidth={buttonsWidth}>
            <div className='block'>
                <div className='actions_top'>
                    <button>
                        C
                    </button>
                    <button>
                        delete
                    </button>
                    <button>
                        %
                    </button>
                </div>
                <div className='numbers'>
                    <button>9</button>
                    <button>8</button>
                    <button>7</button>
                    <button>6</button>
                    <button>5</button>
                    <button>4</button>
                    <button>3</button>
                    <button>2</button>
                    <button>1</button>
                    <button>+/-</button>
                    <button>0</button>
                    <button>,</button>
                </div>
            </div>
            <div className='block'>
                <div className='actions_right'>
                    <button>/</button>
                    <button>x</button>
                    <button>-</button>
                    <button>+</button>
                    <button>=</button>
                </div>
            </div>
        </ButtonsWrapper>
    );
};

export default RenderButtons;