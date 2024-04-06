import React,{FC} from 'react';
import styled from "styled-components";
import {colors, flexCenter} from "../../styles/styles";

interface IconButtonProps {
    label?: string,
    icon: string,
    alt?: string,
    iconLocation: 'before' | 'after',
    onClick: () => any,
}

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
   background-color: ${colors.secondaryLight} !important;
  position: relative;
  cursor: pointer;
  transition: 0.3s;
  ${flexCenter}
  span{
    color: ${colors.mainDark};
    margin: auto 8px;
  }
  img {
    height: 24px;
    object-fit: contain;
  }
  @media(hover: hover){
    &:hover {
      padding: 12px 24px;
      border: 1px solid ${colors.secondaryLight};
    }
  }
  @media(hover: none){
    &:active {
      padding: 12px 24px;
      border: 1px solid ${colors.secondaryLight};
    }
  }
`;

const IconButton:FC<IconButtonProps> = ({label,icon,alt = 'text',iconLocation,onClick}) => {
    return(
        <Button onClick={onClick}>
            {iconLocation === 'before' &&
                <img src={icon} alt={alt}/>
            }
            {label &&
                <span>{label}</span>
            }
            {iconLocation === 'after' &&
                <img src={icon} alt={alt}/>
            }
        </Button>
    )
}

export default IconButton;